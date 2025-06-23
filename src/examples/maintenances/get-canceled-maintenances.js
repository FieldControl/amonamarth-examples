// Exemplo baseado na documentação disponível em https://amonamarth.fieldcontrol.com.br/docs
// Os dados informados são apenas exemplos de testes e não representam a verdade

import { client } from '../../core/client.js'
import { getData } from '../../core/utils.js'

async function run () {
  const maintenances = await client.get('/maintenances', {
    params: {
      page: 1,
      perPage: 10,
      direction: 'desc',
      statusIn: 'CANCELED',
      openedAtGte: '2025-01-01T00:00:00.000Z',
      openedAtLte: '2025-06-30T23:59:59.999Z'

    }
  }).then(getData)

  console.log('Total:', maintenances.length)

  for (const maintenance of maintenances) {

  }
}

run()
  .catch(err => {
    const error = err.isAxiosError ? err.toJSON() : err
    console.log('error: ', error)
    process.exit(1)
  })
