// Example based on the documentation available at https://amonamarth.fieldcontrol.com.br/docs
// The data provided are only test examples and do not represent the truth

import { client } from '../../../core/client.js'
import { getData } from '../../../core/utils.js'

async function run () {
  // Get companies with exact name equal to "Field Control"
  // Only one item per page
  // Page one or first page
  await client.get('/companies', {
    params: {
      page: 1,
      perPage: 1,
      nameEq: 'Field Control'
    }
  }).then(getData)

  // Get companies with exact name equal to "Field Control"
  // Only two items per page
  // Page one or first page
  // From oldest to newest
  await client.get('/companies', {
    params: {
      page: 1,
      perPage: 2,
      nameEq: 'Field Control',
      orderBy: 'createdAt',
      direction: 'asc'
    }
  }).then(getData)

  // Get companies that have a name identical to "Resolv"
  // Only one item per page
  // Page one or first page
  await client.get('/companies', {
    params: {
      page: 1,
      perPage: 1,
      nameEq: 'Resolv'
    }
  }).then(getData)

  // Only two items per page
  // Page one or first page
  // With the name from Z to A
  await client.get('/companies', {
    params: {
      page: 1,
      perPage: 2,
      orderBy: 'name',
      direction: 'desc'
    }
  }).then(getData)

  // Only two items per page
  // Page one or first page
  // Farthest to nearest
  // The "distanceRelativeTo" field must be a string containing the latitude and longitude, respectively ("latitude,longitude")
  // The "distanceRelativeTo" field can only be provided if the orderColumn field is equal to "distance"
  // Companies without coordinates will be placed at the end of the list
  await client.get('/companies', {
    params: {
      page: 1,
      perPage: 2,
      orderBy: 'distance',
      direction: 'desc',
      distanceRelativeTo: '37.7749,-122.4194'
    }
  }).then(getData)
}

run()
  .catch(err => {
    const error = err.isAxiosError ? err.toJSON() : err
    console.log('error: ', error)
    process.exit(1)
  })
