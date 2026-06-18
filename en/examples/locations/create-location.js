// Example based on the documentation available at https://amonamarth.fieldcontrol.com.br/docs
// The data provided are only test examples and do not represent the truth

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
    name: 'Test location 2',
    locationGroup: {
      id: locationGroup.id
    },
    address: {
      number: 'S/N',
      postalCode: '12345678',
      streetName: 'Test street',
      neighborhood: 'Test neighborhood',
      city: 'Test city',
      state: 'SP',
      coords: {
        latitude: -23.123456,
        longitude: -45.123456
      }
    }
  }).then(getData)

  assert.equal(location.name, 'Test location 2')
}

run()
  .catch(err => {
    const error = err.isAxiosError ? err.toJSON() : err
    console.log('error: ', error)
    process.exit(1)
  })
