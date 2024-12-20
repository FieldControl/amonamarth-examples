// Exemplo baseado na documentação disponível em https://amonamarth.fieldcontrol.com.br/docs
// Os dados informados são apenas exemplos de testes e não representam a verdade

import { client } from '../../core/client.js'
import { getData, getFistItem } from '../../core/utils.js'

async function run () {
  // Obter empresas que contenham "Field Control" em seus nomes (não sensitivo)
  // Apenas um item por página
  // Página um ou primeira página
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
    title: '🚨 Pendência de teste criada via API',
    description: 'Esta é uma pendência de teste criada via API',
    companyId: company.id,
    pendencyTypeId: pendencyType.id
  }).then(getData)
}

run()
  .catch(err => {
    const error = err.isAxiosError ? err.toJSON() : err
    console.log('error: ', error)
    process.exit(1)
  })
