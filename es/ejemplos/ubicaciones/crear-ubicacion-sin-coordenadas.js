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
      nameEq: 'Guapiaçu'
    }
  }).then(getFistItem)

  console.log('locationGroup', locationGroup)

  const location = await client.post('/locations', {
    name: 'Ubicación de prueba 2',
    locationGroup: {
      id: locationGroup.id
    },
    address: {
      number: '500',
      postalCode: '15045606',
      streetName: 'Manoel Freitas de Assunção',
      neighborhood: 'Rio sella',
      city: 'São josé do rio preto',
      state: 'SP',
      coords: null
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
