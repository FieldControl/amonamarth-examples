// Example based on the documentation available at https://amonamarth.fieldcontrol.com.br/docs
// The data provided are only test examples and do not represent the truth

import { client } from '../../../core/client.js'

async function run () {
  // Get companies near "Avenida Abrão josé de lima 659"
  const result = await client.post('/companies/actions/nearby', {
    formattedAddress: 'Avenida Abrão josé de lima 659',
    postalCode: '15110000', // optional
    countryCode: null // optional
  }, {
    params: {
      page: 1,
      perPage: 2
    }
  })

  console.log('headers: ', result.headers)
  console.log('data: ', result.data)
}

run()
  .catch(err => {
    const error = err.isAxiosError ? err.toJSON() : err
    console.log('error: ', error)
    process.exit(1)
  })
