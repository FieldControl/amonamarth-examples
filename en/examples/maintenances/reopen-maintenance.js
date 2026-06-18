// Example based on the documentation available at https://amonamarth.fieldcontrol.com.br/docs
// The data provided are only test examples and do not represent the truth

import { client } from '../../../core/client.js'
import { getData, getFistItem } from '../../../core/utils.js'
import { strictEqual } from 'node:assert'

async function run () {
  const pendingMaintenance = await client.get('/maintenances', {
    params: {
      page: 1,
      perPage: 1,
      statusIn: 'CANCELED'
    }
  }).then(getFistItem)

  const canceledMaintenance = await client.post(`/maintenances/${pendingMaintenance.id}/actions/reopen`, {
    reopeningReason: 'This is a test reopening reason!'
  })
    .then(getData)

  strictEqual(pendingMaintenance.id, canceledMaintenance.id)
  strictEqual(canceledMaintenance.status, 'NEW')
  strictEqual(canceledMaintenance.statusDescription, 'This is a test reopening reason!')
}

run()
  .catch(err => {
    const error = err.isAxiosError ? err.toJSON() : err
    console.log('error: ', error)
    process.exit(1)
  })
