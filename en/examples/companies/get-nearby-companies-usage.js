// Example based on the documentation available at https://amonamarth.fieldcontrol.com.br/docs
// The data provided are only test examples and do not represent the truth

import { client } from '../../../core/client.js'
import { getData } from '../../../core/utils.js'
import assert from 'node:assert'

async function run () {
  // Get company geolocation usage history
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
