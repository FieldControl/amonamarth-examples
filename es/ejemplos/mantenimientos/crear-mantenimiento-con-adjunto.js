// Ejemplo basado en la documentación disponible en https://amonamarth.fieldcontrol.com.br/docs
// Los datos proporcionados son solo ejemplos de prueba y no representan la realidad

import { client } from '../../../core/client.js'
import { getData, getFistItem, getItems } from '../../../core/utils.js'
import FormData from 'form-data'
import { readFileSync, readdirSync } from 'node:fs'
import { join, extname, basename } from 'node:path'
import { fileURLToPath } from 'node:url'
import assert from 'node:assert'

// Ejemplo de carga con Node.js basado en la documentación oficial de AWS
// Se hicieron adaptaciones porque la documentación oficial usa solo HTML plano
// enlace a la documentación original: https://docs.aws.amazon.com/AmazonS3/latest/API/sigv4-post-example.html#sigv4-post-example-file-upload

// función utilitaria que devuelve un buffer y los metadatos del archivo a partir de una ruta absoluta
async function readFile (absoluteFilePath) {
  const extension = extname(absoluteFilePath).replace('.', '')
  const buffer = readFileSync(absoluteFilePath)
  const name = basename(absoluteFilePath)
  const size = buffer.byteLength
  return {
    name,
    buffer,
    size,
    extension
  }
}

// función utilitaria para construir el payload en formato multipart/form-data
async function buildFormData ({ credentials, file }) {
  const form = new FormData()
  for (const [key, value] of Object.entries(credentials.fields)) {
    form.append(key, value)
  }

  form.append('file', file.buffer)

  return form
}

// función que devuelve los headers requeridos por el endpoint de carga de AWS
async function buildUploadHeaders ({ formData }) {
  const boundary = formData.getBoundary()
  const contentLength = formData.getLengthSync()
  const contentType = `multipart/form-data; boundary=${boundary}`

  return {
    'content-type': contentType,
    'content-length': contentLength
  }
}

async function run () {
  // leyendo los archivos de ejemplo ubicados en la carpeta "data" en la raíz de este proyecto
  const currentDirPath = fileURLToPath(import.meta.url)
  const dataDirPath = join(currentDirPath, '../../../../data')
  const fileNames = readdirSync(dataDirPath)
  const absoluteFileNames = fileNames.map(fileName => join(dataDirPath, fileName))

  // arreglo que contiene los metadatos y el buffer de los archivos
  const files = await Promise.all(absoluteFileNames.map(readFile))

  const attachments = []

  for (const file of files) {
    // solicitud para obtener las credenciales que se usarán más adelante para la carga
    const credentials = await client
      .post('/attachments/actions/generate-upload-credentials', {
        size: file.size,
        extension: file.extension
      })
      .then(getData)

    // construyendo el payload con el archivo en formato multipart/form-data
    // y campos adicionales con las credenciales requeridas para la autenticación
    const formData = await buildFormData({ credentials, file })

    // construyendo los headers requeridos por el endpoint de carga
    const headers = await buildUploadHeaders({ formData })

    // cargando directamente a AWS S3
    await client.post(credentials.baseUrl, formData, { headers })

    // guardando el nombre y el enlace del archivo para adjuntarlo al mantenimiento más adelante
    attachments.push({
      title: file.name,
      link: credentials.link
    })
  }

  // buscando cualquier ubicación para usar al abrir un mantenimiento
  const location = await client.get('/locations', {
    params: {
      page: 1,
      perPage: 1,
      documentNumberEq: '46849145851'
    }
  }).then(getFistItem)

  // buscando cualquier segmento para usar al abrir un mantenimiento
  const segment = await client.get('/segments', {
    params: {
      page: 1,
      perPage: 1,
      nameEq: '001 - Ar condicionado'
    }
  }).then(getFistItem)

  // buscando cualquier tipo de mantenimiento para usar al abrir un mantenimiento
  const maintenanceType = await client.get('/maintenance-types', {
    params: {
      page: 1,
      perPage: 1,
      nameEq: 'Manutenção corretiva'
    }
  }).then(getFistItem)

  // creando un mantenimiento pasando los adjuntos como argumento
  const maintenance = await client.post('/maintenances', {
    message: 'Mantenimiento con adjuntos vinculados',
    location: { id: location.id },
    segment: { id: segment.id },
    maintenanceType: { id: maintenanceType.id },
    attachments
  }).then(getData)

  // consultando la página de adjuntos vinculados al mantenimiento
  const createdAttachments = await client.get(`maintenances/${maintenance.id}/attachments`, {
    params: {
      page: 1,
      perPage: 10
    }
  }).then(getItems)

  // verifica si la cantidad de adjuntos del mantenimiento es igual a la cantidad esperada
  assert.equal(createdAttachments.length, files.length)

  for (const attachment of createdAttachments) {
    const file = files.find((file) => file.name === attachment.title)

    // verifica si el título es igual al esperado
    assert.equal(attachment.title, file.name)

    // consulta los headers del archivo usando el enlace generado
    const { status, headers } = await client.head(attachment.link)

    // verifica si se devuelve 200 al acceder al enlace del archivo
    assert.equal(status, 200)

    // verifica si el tamaño del archivo es igual al esperado
    assert.equal(headers['content-length'], file.size)
  }
}

run()
  .catch(err => {
    const error = err.isAxiosError ? err.toJSON() : err
    console.log('error: ', error)
    process.exit(1)
  })
