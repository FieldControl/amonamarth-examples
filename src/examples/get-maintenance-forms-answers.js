// Exemplo baseado na documentação disponível em https://amonamarth.fieldcontrol.com.br/docs
// Os dados informados são apenas exemplos de testes e não representam a verdade

import { client } from '../core/client.js'
import { getData } from '../core/utils.js'

async function run () {
  await client.get('/maintenances/e1c823ff-7000-4fde-90a6-aa4596169a76/form-answers/be46fbc1-fd70-4583-bad3-24403bf54ea5', {
    params: {
      page: 1,
      perPage: 10
    }
  }).then(getData)
}

run()
  .catch(err => {
    const error = err.isAxiosError ? err.toJSON() : err
    console.log('error: ', error)
    process.exit(1)
  })
