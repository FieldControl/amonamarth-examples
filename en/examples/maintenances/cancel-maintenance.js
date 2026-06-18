// Example based on the documentation available at https://amonamarth.fieldcontrol.com.br/docs
// The data provided are only test examples and do not represent the truth

import { client } from '../../../core/client.js'
import { getData, getFistItem } from '../../../core/utils.js'
import { strictEqual } from 'node:assert'

async function run () {
  const payload = {
    cancellationReason: 'The board of directors team decided to cancel such activities!'
  }

  const pendingMaintenance = await client.get('/maintenances', {
    params: {
      page: 1,
      perPage: 1,
      statusIn: 'PENDING'
    }
  }).then(getFistItem)

  const canceledMaintenance = await client.post(`/maintenances/${pendingMaintenance.id}/actions/cancel`, payload)
    .then(getData)

  strictEqual(pendingMaintenance.id, canceledMaintenance.id)
  strictEqual(canceledMaintenance.status, 'CANCELED')
  strictEqual(canceledMaintenance.statusDescription, payload.cancellationReason)
}

run()
  .catch(err => {
    const error = err.isAxiosError ? err.toJSON() : err
    console.log('error: ', error)
    process.exit(1)
  })
