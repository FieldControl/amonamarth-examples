// Exemplo baseado na documentação disponível em https://amonamarth.fieldcontrol.com.br/docs
// Os dados informados são apenas exemplos de testes e não representam a verdade

import { client } from '../core/client.js'
import { getData, getFistItem } from '../core/utils.js'
import assert from 'node:assert'

async function run () {
  const segment = await client.get('/segments', {
    params: {
      page: 1,
      perPage: 10,
      nameEq: 'Ar condicionado'
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
        type: 'text',
        required: true
      },
      {
        name: 'Campo 2',
        type: 'number',
        required: false
      },
      {
        name: 'Campo 3',
        type: 'date',
        required: true
      },
      {
        name: 'Campo 4',
        type: 'select',
        required: false
      }
    ]
  }).then(getData)

  assert.equal(equipmentType.name, 'Local de teste 2')
}

run()
  .catch(err => {
    const error = err.isAxiosError ? err.toJSON() : err
    console.log('error: ', error)
    process.exit(1)
  })
