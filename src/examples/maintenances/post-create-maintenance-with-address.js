import assert from 'node:assert'
import { client } from '../../core/client.js'
import { getData, getFistItem } from '../../core/utils.js'

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

  // criando manutenção com endereço personalizado
  const maintenance = await client.post('/maintenances', {
    message: 'Manutenção com endereço personalizado',
    location: { id: location.id },
    segment: { id: segment.id },
    maintenanceType: { id: maintenanceType.id },
    address: {
      state: 'SP',
      city: 'São José do Rio Preto',
      neighborhood: 'Jardim Planalto',
      street: 'Avenida Waldemar Freitas de Assunção',
      zipCode: '15045606',
      number: '400',
      complement: 'BL 00 AP 00',
      coords: {
        latitude: -20.7605767,
        longitude: -49.3862704
      }
    }
  }).then(getData)

  assert.equal(maintenance.message, 'Manutenção com endereço personalizado')
}

run()
  .catch(err => {
    const error = err.isAxiosError ? err.toJSON() : err
    console.log('error: ', error)
    process.exit(1)
  })
