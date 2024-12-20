// Exemplo baseado na documentação disponível em https://amonamarth.fieldcontrol.com.br/docs
// Os dados informados são apenas exemplos de testes e não representam a verdade

import { client } from '../core/client.js'
import { getData } from '../core/utils.js'

async function run () {
  await client.post('/pendencies/e5a288a5-af6f-4b2c-ab8f-abd4e21178c2/actions/conclude', {
    title: 'Pendência de teste criada via API',
    description: 'Esta é uma pendência de teste criada via API'
  }).then(getData)
}

run()
  .catch(err => {
    const error = err.isAxiosError ? err.toJSON() : err
    console.log('error: ', error)
    process.exit(1)
  })
