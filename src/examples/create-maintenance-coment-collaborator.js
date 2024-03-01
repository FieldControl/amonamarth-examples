// Exemplo baseado na documentação disponível em https://amonamarth.fieldcontrol.com.br/docs
// Os dados informados são apenas exemplos de testes e não representam a verdade

import { client } from '../core/client.js'
import { getData, getFistItem } from '../core/utils.js'
import assert from 'node:assert'

async function run () {
  // consultando um local qualquer para usar na abertura de manutenção
  const location = await client.get('/locations', {
    params: {
      page: 1,
      perPage: 1,
      documentNumberEq: '46849145851'
    }
  }).then(getFistItem)

  // consultando um segmento qualquer para usar na abertura de manutenção
  const segment = await client.get('/segments', {
    params: {
      page: 1,
      perPage: 1,
      nameEq: 'Ar condicionado'
    }
  }).then(getFistItem)

  // consultando um tipo de manutenção qualquer para usar na abertura de manutenção
  const maintenanceType = await client.get('/maintenance-types', {
    params: {
      page: 1,
      perPage: 1,
      nameEq: 'Manutenção corretiva'
    }
  }).then(getFistItem)

  const maintenance = await client.post('/maintenances', {
    message: 'Manutenção de com anexos vinculados',
    location: { id: location.id },
    segment: { id: segment.id },
    maintenanceType: { id: maintenanceType.id }
  }).then(getData)

  const comment = await client.post(`/maintenances/${maintenance.id}/comments`, {
    message: 'comentário de exemplo',
    archived: false,
    type: 'COLLABORATOR',
    postedBy: {
      name: 'Leo',
      externalId: 'leo-falco',
      avatarUrl: 'https://avatars.githubusercontent.com/u/25820906'
    }
  }).then(getData)

  assert.equal(comment.message, 'comentário de exemplo')
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
