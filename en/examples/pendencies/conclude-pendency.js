// Example based on the documentation available at https://amonamarth.fieldcontrol.com.br/docs
// The data provided are only test examples and do not represent the truth

import { client } from '../../../core/client.js'
import { getData } from '../../../core/utils.js'

async function run () {
  await client.post('/pendencies/e5a288a5-af6f-4b2c-ab8f-abd4e21178c2/actions/conclude').then(getData)
}

run()
  .catch(err => {
    const error = err.isAxiosError ? err.toJSON() : err
    console.log('error: ', error)
    process.exit(1)
  })
