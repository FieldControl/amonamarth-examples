// Exemplo baseado na documentação disponível em https://amonamarth.fieldcontrol.com.br/docs
// Os dados informados são apenas exemplos de testes e não representam a verdade

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
    name: 'Um tipo de equipamento',
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

  assert.equal(equipmentType.name, 'Um tipo de equipamento')
}

run()
  .catch(err => {
    const error = err.isAxiosError ? err.toJSON() : err
    console.log('error: ', error)
    process.exit(1)
  })
