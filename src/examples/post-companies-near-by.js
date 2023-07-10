// Exemplo baseado na documentação disponível em https://amonamarth.fieldcontrol.com.br/docs
// Os dados informados são apenas exemplos de testes e não representam a verdade

import { client } from '../core/client.js'
import { getData } from '../core/utils.js'

async function run () {
  // Obter empresas próximas a "Avenida Abrão josé de lima 659"
  // https://amonamarth.fieldcontrol.com.br/docs#/Companies/CompanyController_nearBy
  const result = await client.post('/companies/actions/nearby', {
    formattedAddress: 'Avenida Abrão josé de lima 659',
    postalCode: '15110000', // opcional
    countryCode: null // opcional
  }, {
    params: {
      page: 1,
      perPage: 2
    }
  }).then(getData)

  console.log('result', result)
}

run()
  .catch(err => {
    const error = err.isAxiosError ? err.toJSON() : err
    console.log('error: ', error)
    process.exit(1)
  })
