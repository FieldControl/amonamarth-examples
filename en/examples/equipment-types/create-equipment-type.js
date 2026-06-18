// Example based on the documentation available at https://amonamarth.fieldcontrol.com.br/docs
// The data provided are only test examples and do not represent the truth

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
    name: 'An equipment type',
    archived: false,
    segment: {
      id: segment.id
    },
    customFields: [
      {
        name: 'Field 1',
        type: 'QUESTION',
        required: true
      },
      {
        name: 'Field 2',
        type: 'NUMBER',
        required: false
      },
      {
        name: 'Field 3',
        type: 'DATE',
        required: true
      },
      {
        name: 'Field 4',
        type: 'MULTIPLE_CHOICE',
        required: false
      }
    ]
  }).then(getData)

  assert.equal(equipmentType.name, 'An equipment type')
}

run()
  .catch(err => {
    const error = err.isAxiosError ? err.toJSON() : err
    console.log('error: ', error)
    process.exit(1)
  })
