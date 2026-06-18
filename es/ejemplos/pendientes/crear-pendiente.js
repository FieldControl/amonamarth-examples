// Ejemplo basado en la documentación disponible en https://amonamarth.fieldcontrol.com.br/docs
// Los datos proporcionados son solo ejemplos de prueba y no representan la realidad

import { client } from '../../../core/client.js'
import { getData, getFistItem } from '../../../core/utils.js'

async function run () {
  // Obtener empresas que contengan "Field Control" en sus nombres (sin distinción de mayúsculas)
  // Solo un elemento por página
  // Página uno o primera página
  const company = await client.get('/companies', {
    params: {
      page: 1,
      perPage: 1,
      nameEq: 'Field Control - Fornecedor 8817'
    }
  }).then(getFistItem)

  console.log('company: ', company)

  const pendencyType = await client.get('/pendencies-types', {
    params: {
      page: 1,
      perPage: 1,
      nameEq: 'Falta documento'
    }
  }).then(getFistItem)

  await client.post('/pendencies', {
    title: '🚨 Pendiente de prueba creado vía API',
    description: 'Este es un pendiente de prueba creado vía API',
    company: { id: company.id },
    pendencyType: { id: pendencyType.id }
  }).then(getData)
}

run()
  .catch(err => {
    const error = err.isAxiosError ? err.toJSON() : err
    console.log('error: ', error)
    process.exit(1)
  })
