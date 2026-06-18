// Ejemplo basado en la documentación disponible en https://amonamarth.fieldcontrol.com.br/docs
// Los datos proporcionados son solo ejemplos de prueba y no representan la realidad

import { client } from '../../../core/client.js'
import { getData } from '../../../core/utils.js'

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
    console.log('Mantenimiento:', maintenance)
  }
}

run()
  .catch(err => {
    const error = err.isAxiosError ? err.toJSON() : err
    console.log('error: ', error)
    process.exit(1)
  })
