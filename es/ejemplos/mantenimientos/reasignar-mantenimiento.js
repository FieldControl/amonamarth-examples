// Ejemplo basado en la documentación disponible en https://amonamarth.fieldcontrol.com.br/docs
// Los datos proporcionados son solo ejemplos de prueba y no representan la realidad

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

  const canceledMaintenance = await client.post(`/maintenances/${pendingMaintenance.id}/actions/reallocate`, {
    message: '¡Este es un motivo de reasignación de prueba!'
  })
    .then(getData)

  strictEqual(pendingMaintenance.id, canceledMaintenance.id)
  strictEqual(canceledMaintenance.status, 'NEW')
  strictEqual(canceledMaintenance.statusDescription, '¡Este es un motivo de reasignación de prueba!')
}

run()
  .catch(err => {
    const error = err.isAxiosError ? err.toJSON() : err
    console.log('error: ', error)
    process.exit(1)
  })
