// Exemplo baseado na documentação disponível em https://amonamarth.fieldcontrol.com.br/docs
// Os dados informados são apenas exemplos de testes e não representam a verdade

import { client } from '../../core/client.js'
import { getData, getFistItem } from '../../core/utils.js'
import assert from 'node:assert'

async function run () {
  //  "message": "page must be an integer number, page must not be less than 1, perPage must be an integer number, perPage must not be greater than 100, perPage must not be less than 1",
  const maintenance = await client.get('/maintenances', {
    params: {
      page: 1,
      perPage: 1,
      numberEq: '00013259'
    }
  }).then(getFistItem)

  assert.equal(maintenance.number, '00013259')

  const comment = await client.post(`/maintenances/${maintenance.id}/comments`, {
    message: 'comentário de exemplo 2',
    archived: false,
    type: 'COLLABORATOR',
    postedBy: {
      name: 'Leo',
      externalId: 'leo-falco',
      avatarUrl: 'https://avatars.githubusercontent.com/u/25820906'
    }
  }).then(getData)

  assert.equal(comment.message, 'comentário de exemplo 2')
  assert.equal(comment.type, 'COLLABORATOR')
  assert.equal(comment.postedBy.id, '5dc173b9-f3c7-5fff-a5f9-f4bcecd3cdb9')
  assert.equal(comment.postedBy.name, 'Leo')
  assert.equal(comment.postedBy.avatarUrl, 'https://avatars.githubusercontent.com/u/25820906')

  const commentsPage = await client.get(`/maintenances/${maintenance.id}/comments`, {
    params: {
      page: 1,
      perPage: 1
    }
  }).then(getData)

  assert.equal(commentsPage.items.length, 1)
}

run()
  .catch(err => {
    const error = err.isAxiosError ? err.toJSON() : err
    console.log('error: ', error)
    process.exit(1)
  })
