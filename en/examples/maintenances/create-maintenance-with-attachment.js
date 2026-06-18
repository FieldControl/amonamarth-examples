// Example based on the documentation available at https://amonamarth.fieldcontrol.com.br/docs
// The data provided are only test examples and do not represent the truth

import { client } from '../../../core/client.js'
import { getData, getFistItem, getItems } from '../../../core/utils.js'
import FormData from 'form-data'
import { readFileSync, readdirSync } from 'node:fs'
import { join, extname, basename } from 'node:path'
import { fileURLToPath } from 'node:url'
import assert from 'node:assert'

// Node.js upload example based on the official AWS documentation
// Adaptations were made because the official documentation uses only plain HTML
// link to the original documentation: https://docs.aws.amazon.com/AmazonS3/latest/API/sigv4-post-example.html#sigv4-post-example-file-upload

// utility function that returns a buffer and file metadata from an absolute path
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

// utility function to build the payload in multipart/form-data format
async function buildFormData ({ credentials, file }) {
  const form = new FormData()
  for (const [key, value] of Object.entries(credentials.fields)) {
    form.append(key, value)
  }

  form.append('file', file.buffer)

  return form
}

// function that returns the headers required by the AWS upload endpoint
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
  // reading example files located in the "data" folder at the root of this project
  const currentDirPath = fileURLToPath(import.meta.url)
  const dataDirPath = join(currentDirPath, '../../../../data')
  const fileNames = readdirSync(dataDirPath)
  const absoluteFileNames = fileNames.map(fileName => join(dataDirPath, fileName))

  // array holding metadata and buffer for the files
  const files = await Promise.all(absoluteFileNames.map(readFile))

  const attachments = []

  for (const file of files) {
    // request to obtain the credentials that will be used for the upload later
    const credentials = await client
      .post('/attachments/actions/generate-upload-credentials', {
        size: file.size,
        extension: file.extension
      })
      .then(getData)

    // building the payload with the file in multipart/form-data format
    // and additional fields with the credentials required for authentication
    const formData = await buildFormData({ credentials, file })

    // building the headers required by the upload endpoint
    const headers = await buildUploadHeaders({ formData })

    // uploading directly to AWS S3
    await client.post(credentials.baseUrl, formData, { headers })

    // saving the file name and link to attach to the maintenance later
    attachments.push({
      title: file.name,
      link: credentials.link
    })
  }

  // looking up any location to use when opening a maintenance
  const location = await client.get('/locations', {
    params: {
      page: 1,
      perPage: 1,
      documentNumberEq: '46849145851'
    }
  }).then(getFistItem)

  // looking up any segment to use when opening a maintenance
  const segment = await client.get('/segments', {
    params: {
      page: 1,
      perPage: 1,
      nameEq: '001 - Ar condicionado'
    }
  }).then(getFistItem)

  // looking up any maintenance type to use when opening a maintenance
  const maintenanceType = await client.get('/maintenance-types', {
    params: {
      page: 1,
      perPage: 1,
      nameEq: 'Manutenção corretiva'
    }
  }).then(getFistItem)

  // creating a maintenance passing the attachments as an argument
  const maintenance = await client.post('/maintenances', {
    message: 'Maintenance with linked attachments',
    location: { id: location.id },
    segment: { id: segment.id },
    maintenanceType: { id: maintenanceType.id },
    attachments
  }).then(getData)

  // querying the page of attachments linked to the maintenance
  const createdAttachments = await client.get(`maintenances/${maintenance.id}/attachments`, {
    params: {
      page: 1,
      perPage: 10
    }
  }).then(getItems)

  // checks if the number of attachments on the maintenance equals the expected count
  assert.equal(createdAttachments.length, files.length)

  for (const attachment of createdAttachments) {
    const file = files.find((file) => file.name === attachment.title)

    // checks if the title equals the expected one
    assert.equal(attachment.title, file.name)

    // queries the file headers using the generated link
    const { status, headers } = await client.head(attachment.link)

    // checks if 200 is returned when accessing the file link
    assert.equal(status, 200)

    // checks if the file size equals the expected one
    assert.equal(headers['content-length'], file.size)
  }
}

run()
  .catch(err => {
    const error = err.isAxiosError ? err.toJSON() : err
    console.log('error: ', error)
    process.exit(1)
  })
