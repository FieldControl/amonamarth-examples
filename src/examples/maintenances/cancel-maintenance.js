// Exemplo baseado na documentação disponível em https://amonamarth.fieldcontrol.com.br/docs
// Os dados informados são apenas exemplos de testes e não representam a verdade

import { client } from '../../core/client.js'
import { getData, getFistItem } from '../../core/utils.js'
import { strictEqual } from 'node:assert'

async function run () {
  const payload = {
    cancellationReason: 'Equipe do conselho de administradores decidiu cancelar tais atividades!'
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
