// Exemplo baseado na documentação disponível em https://amonamarth.fieldcontrol.com.br/docs
// Os dados informados são apenas exemplos de testes e não representam a verdade

import { client } from '../../core/client.js'
import { getData } from '../../core/utils.js'
import assert from 'node:assert'

async function run () {
  // Obter histórico de uso de geolocalização de empresa
  const result = await client.get('/companies/actions/nearby/usage').then(getData)

  assert.deepEqual(result, {
    items: [
      {
        id: 'eyJwayI6IlVTQUdFIzEiLCJzayI6IjIwMjMtMDcifQ==',
        month: '2023-07',
        quota: 2000,
        usedQuota: 10
      }
    ]
  })
}

run()
  .catch(err => {
    const error = err.isAxiosError ? err.toJSON() : err
    console.log('error: ', error)
    process.exit(1)
  })
