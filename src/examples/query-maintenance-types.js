import { client } from '../core/client.js'
import { getData } from '../core/utils.js'

async function run () {
  await client.get('/maintenance-types', {
    params: {
      page: 1,
      perPage: 1,
      nameEq: 'Visita técnica'
    }
  }).then(getData)
}

run()
  .catch(err => {
    const error = err.isAxiosError ? err.toJSON() : err
    console.log('error: ', error)
    process.exit(1)
  })
