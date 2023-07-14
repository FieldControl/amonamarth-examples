import { client } from '../core/client.js'
import { getData, getFistItem } from '../core/utils.js'

async function run () {
  // consultando um local qualquer para usar na abertura de manutenção
  const location = await client.get('/locations', {
    params: {
      page: 1,
      perPage: 1,
      documentNumberEq: '46849145851'
    }
  }).then(getFistItem)

  // consultando um segmento qualquer para usar na abertura de manutenção
  const segment = await client.get('/segments', {
    params: {
      page: 1,
      perPage: 1,
      nameEq: 'Ar condicionado'
    }
  }).then(getFistItem)

  // consultando um tipo de manutenção qualquer para usar na abertura de manutenção
  const maintenanceType = await client.get('/maintenance-types', {
    params: {
      page: 1,
      perPage: 1,
      nameEq: 'Manutenção corretiva'
    }
  }).then(getFistItem)

  // criando manutenção com sugestão de agendamento
  const maintenance = await client.post('/maintenances', {
    message: 'Manutenção de com anexos vinculados',
    location: { id: location.id },
    segment: { id: segment.id },
    maintenanceType: { id: maintenanceType.id },
    scheduleSuggestions: [
      {
        date: '2023-08-12',
        time: '17:00'
      },
      {
        date: '2023-08-16',
        time: null
      }
    ]
  }).then(getData)

  console.log('maintenance', maintenance)
}

run()
  .catch(err => {
    const error = err.isAxiosError ? err.toJSON() : err
    console.log('error: ', error)
    process.exit(1)
  })
