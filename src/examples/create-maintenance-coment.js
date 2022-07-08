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

  const maintenance = await client.post('/maintenances', {
    message: 'Manutenção de com anexos vinculados',
    location: { id: location.id },
    segment: { id: segment.id },
    maintenanceType: { id: maintenanceType.id }
  }).then(getData)

  const comment = await client.post(`/maintenances/${maintenance.id}/comments`, {
    message: 'comentário de teste',
    archived: false,
    type: 'INTERNAL',
    postedBy: {
      name: 'Leo',
      externalId: 'leo-falco'
    }
  }).then(getData)

  console.log('comment', comment)
}

run()
  .catch(err => {
    const error = err.isAxiosError ? err.toJSON() : err
    console.log('error: ', error)
    process.exit(1)
  })
