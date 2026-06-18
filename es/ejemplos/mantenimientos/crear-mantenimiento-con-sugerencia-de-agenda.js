import assert from 'node:assert'
import { client } from '../../../core/client.js'
import { getData, getFistItem } from '../../../core/utils.js'

async function run () {
  // buscando cualquier ubicación para usar al abrir un mantenimiento
  const location = await client.get('/locations', {
    params: {
      page: 1,
      perPage: 1,
      documentNumberEq: '46849145851'
    }
  }).then(getFistItem)

  // buscando cualquier segmento para usar al abrir un mantenimiento
  const segment = await client.get('/segments', {
    params: {
      page: 1,
      perPage: 1,
      nameEq: '001 - Ar condicionado'
    }
  }).then(getFistItem)

  // buscando cualquier tipo de mantenimiento para usar al abrir un mantenimiento
  const maintenanceType = await client.get('/maintenance-types', {
    params: {
      page: 1,
      perPage: 1,
      nameEq: 'Manutenção corretiva'
    }
  }).then(getFistItem)

  const currentYear = new Date().getFullYear()
  // creando un mantenimiento con una sugerencia de agenda
  const maintenance = await client.post('/maintenances', {
    message: 'Mantenimiento con adjuntos vinculados',
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

  assert.equal(maintenance.message, 'Mantenimiento con adjuntos vinculados')
}

run()
  .catch(err => {
    const error = err.isAxiosError ? err.toJSON() : err
    console.log('error: ', error)
    process.exit(1)
  })
