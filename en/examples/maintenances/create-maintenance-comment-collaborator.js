// Example based on the documentation available at https://amonamarth.fieldcontrol.com.br/docs
// The data provided are only test examples and do not represent the truth

import { client } from '../../../core/client.js'
import { getData, getFistItem } from '../../../core/utils.js'
import assert from 'node:assert'

async function run () {
  // looking up any location to use when opening a maintenance
  const location = await client.get('/locations', {
    params: {
      page: 1,
      perPage: 1,
      documentNumberEq: '46849145851'
    }
  }).then(getFistItem)

  // looking up any segment to use when opening a maintenance
  const segment = await client.get('/segments', {
    params: {
      page: 1,
      perPage: 1,
      nameEq: '001 - Ar condicionado'
    }
  }).then(getFistItem)

  // looking up any maintenance type to use when opening a maintenance
  const maintenanceType = await client.get('/maintenance-types', {
    params: {
      page: 1,
      perPage: 1,
      nameEq: 'Manutenção corretiva'
    }
  }).then(getFistItem)

  const maintenance = await client.post('/maintenances', {
    message: 'Maintenance with linked attachments',
    location: { id: location.id },
    segment: { id: segment.id },
    maintenanceType: { id: maintenanceType.id }
  }).then(getData)

  const comment = await client.post(`/maintenances/${maintenance.id}/comments`, {
    message: 'example comment',
    archived: false,
    type: 'COLLABORATOR',
    postedBy: {
      name: 'Leo',
      externalId: 'leo-falco',
      avatarUrl: 'https://avatars.githubusercontent.com/u/25820906'
    }
  }).then(getData)

  assert.equal(comment.message, 'example comment')
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
