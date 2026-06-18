// Ejemplo basado en la documentación disponible en https://amonamarth.fieldcontrol.com.br/docs
// Los datos proporcionados son solo ejemplos de prueba y no representan la realidad

import { client } from '../../../core/client.js'
import { getData } from '../../../core/utils.js'
import assert from 'node:assert'

async function run () {
  // Obtener el historial de uso de geolocalización de empresas
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
