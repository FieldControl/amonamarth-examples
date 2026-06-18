// Ejemplo basado en la documentación disponible en https://amonamarth.fieldcontrol.com.br/docs
// Los datos proporcionados son solo ejemplos de prueba y no representan la realidad

import { client } from '../../../core/client.js'
import { getData, getFistItem } from '../../../core/utils.js'
import assert from 'node:assert'

async function run () {
  const segment = await client.get('/segments', {
    params: {
      page: 1,
      perPage: 10,
      nameEq: '001 - Ar condicionado'
    }
  }).then(getFistItem)

  const equipmentType = await client.post('/equipment-types', {
    name: 'Un tipo de equipo',
    archived: false,
    segment: {
      id: segment.id
    },
    customFields: [
      {
        name: 'Campo 1',
        type: 'QUESTION',
        required: true
      },
      {
        name: 'Campo 2',
        type: 'NUMBER',
        required: false
      },
      {
        name: 'Campo 3',
        type: 'DATE',
        required: true
      },
      {
        name: 'Campo 4',
        type: 'MULTIPLE_CHOICE',
        required: false
      }
    ]
  }).then(getData)

  assert.equal(equipmentType.name, 'Un tipo de equipo')
}

run()
  .catch(err => {
    const error = err.isAxiosError ? err.toJSON() : err
    console.log('error: ', error)
    process.exit(1)
  })
