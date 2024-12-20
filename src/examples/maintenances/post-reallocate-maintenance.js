// Exemplo baseado na documentação disponível em https://amonamarth.fieldcontrol.com.br/docs
// Os dados informados são apenas exemplos de testes e não representam a verdade

import { client } from '../../core/client.js'
import { getData, getFistItem } from '../../core/utils.js'
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
    message: 'Esté é um motivo de realocação de teste!'
  })
    .then(getData)

  strictEqual(pendingMaintenance.id, canceledMaintenance.id)
  strictEqual(canceledMaintenance.status, 'NEW')
  strictEqual(canceledMaintenance.statusDescription, 'Esté é um motivo de realocação de teste!')
}

run()
  .catch(err => {
    const error = err.isAxiosError ? err.toJSON() : err
    console.log('error: ', error)
    process.exit(1)
  })
