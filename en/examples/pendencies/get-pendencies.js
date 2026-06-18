// Example based on the documentation available at https://amonamarth.fieldcontrol.com.br/docs
// The data provided are only test examples and do not represent the truth

import { client } from '../../../core/client.js'
import { getData } from '../../../core/utils.js'

async function run () {
  await client.get('/pendencies', {
    params: {
      page: 1,
      perPage: 20,
      titleEq: 'awdawd'
    }
  }).then(getData)
}

run()
  .catch(err => {
    const error = err.isAxiosError ? err.toJSON() : err
    console.log('error: ', error)
    process.exit(1)
  })
