// Ejemplo basado en la documentación disponible en https://amonamarth.fieldcontrol.com.br/docs
// Los datos proporcionados son solo ejemplos de prueba y no representan la realidad

import { client } from '../../../core/client.js'
import { getData, getFistItem } from '../../../core/utils.js'
import assert from 'node:assert'

async function run () {
  const locationGroup = await client.get('/location-groups', {
    params: {
      page: 1,
      perPage: 10,
      nameEq: 'São Paulo'
    }
  }).then(getFistItem)

  const location = await client.post('/locations', {
    name: 'Ubicación de prueba 2',
    locationGroup: {
      id: locationGroup.id
    },
    address: {
      number: 'S/N',
      postalCode: '12345678',
      streetName: 'Calle de prueba',
      neighborhood: 'Barrio de prueba',
      city: 'Ciudad de prueba',
      state: 'SP',
      coords: {
        latitude: -23.123456,
        longitude: -45.123456
      }
    }
  }).then(getData)

  assert.equal(location.name, 'Ubicación de prueba 2')
}

run()
  .catch(err => {
    const error = err.isAxiosError ? err.toJSON() : err
    console.log('error: ', error)
    process.exit(1)
  })
