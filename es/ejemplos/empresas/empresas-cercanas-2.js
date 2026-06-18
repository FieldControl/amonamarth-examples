// Ejemplo basado en la documentación disponible en https://amonamarth.fieldcontrol.com.br/docs
// Los datos proporcionados son solo ejemplos de prueba y no representan la realidad

import { client } from '../../../core/client.js'

async function run () {
  // Obtener empresas cercanas a "Avenida Abrão josé de lima 659"
  const result = await client.post('/companies/actions/nearby', {
    formattedAddress: 'Avenida Abrão josé de lima 659',
    postalCode: '15110000', // opcional
    countryCode: null // opcional
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
