// Ejemplo basado en la documentación disponible en https://amonamarth.fieldcontrol.com.br/docs
// Los datos proporcionados son solo ejemplos de prueba y no representan la realidad

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
