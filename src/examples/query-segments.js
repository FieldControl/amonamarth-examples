import { client } from '../core/client.js'
import { getData } from '../core/utils.js'

async function run () {
  await client.get('/segments', {
    params: {
      page: 1,
      perPage: 1,
      nameEq: 'Ar condicionado é'
    }
  }).then(getData)
}

run()
  .catch(err => {
    const error = err.isAxiosError ? err.toJSON() : err
    console.log('error: ', error)
    process.exit(1)
  })
