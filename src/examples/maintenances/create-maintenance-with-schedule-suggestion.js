import assert from 'node:assert'
import { client } from '../../core/client.js'
import { getData, getFistItem } from '../../core/utils.js'

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
      nameEq: '001 - Ar condicionado'
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

  const currentYear = new Date().getFullYear()
  // criando manutenção com sugestão de agendamento
  const maintenance = await client.post('/maintenances', {
    message: 'Manutenção de com anexos vinculados',
    location: { id: location.id },
    segment: { id: segment.id },
    maintenanceType: { id: maintenanceType.id },
    scheduleSuggestions: [
      {
        date: new Date().toISOString().split('T')[0],
        time: '17:00'
      },
      {
        date: `${currentYear}-12-31`,
        time: '23:59'
      }
    ]
  }).then(getData)

  assert.equal(maintenance.message, 'Manutenção de com anexos vinculados')
}

run()
  .catch(err => {
    const error = err.isAxiosError ? err.toJSON() : err
    console.log('error: ', error)
    process.exit(1)
  })
