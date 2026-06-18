// Example based on the documentation available at https://amonamarth.fieldcontrol.com.br/docs
// The data provided are only test examples and do not represent the truth

import { client } from '../../../core/client.js'
import { getData, getFistItem } from '../../../core/utils.js'

async function run () {
  // Get companies that contain "Field Control" in their names (case-insensitive)
  // Only one item per page
  // Page one or first page
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
    title: '🚨 Test pendency created via API',
    description: 'This is a test pendency created via API',
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
