// Exemplo baseado na documentação disponível em https://amonamarth.fieldcontrol.com.br/docs
// Os dados informados são apenas exemplos de testes e não representam a verdade

import { client } from '../core/client.js'
import { getData } from '../core/utils.js'
import assert from 'node:assert'

async function run () {
  // Obter empresas próximas a "Avenida Abrão josé de lima 659"
  const result = await client.post('/companies/actions/nearby', {
    formattedAddress: 'Avenida Abrão josé de lima 659',
    postalCode: '15110000', // opcional
    countryCode: null // opcional
  }, {
    params: {
      page: 1,
      perPage: 2
    }
  }).then(getData)

  assert.deepEqual(result, {
    items: [
      {
        id: '5a135059-a054-46d1-b431-fb0f1036ccd4',
        name: 'Field Control - Fornecedor 8817',
        relativeDistance: {
          distanceInMeters: 1680, // mais próximas primeiro
          relativeTo: {
            latitude: -20.7972941,
            longitude: -49.221242
          }
        },
        address: {
          city: 'Guapiaçu',
          complement: null,
          coords: {
            latitude: -20.807428,
            longitude: -49.2332
          },
          countryCode: 'BRA',
          neighborhood: 'Guapiaçu',
          number: '686',
          state: 'São Paulo',
          street: 'abrao jose de lima',
          zipCode: '15110000'
        },
        archived: false,
        avatarUrl: 'https://s3.amazonaws.com/attachments.fieldcontrol.com.br/accounts/8817/company-logo.png',
        createdAt: '2019-08-01T12:24:18Z'
      },
      {
        id: 'e75d361b-ceee-4c83-9962-b5ecb4272224',
        name: 'Designers',
        relativeDistance: {
          distanceInMeters: 16463,
          relativeTo: {
            latitude: -20.7972941,
            longitude: -49.221242
          }
        },
        address: {
          city: 'São José do Rio Preto',
          complement: null,
          coords: {
            latitude: -20.8072548,
            longitude: -49.3790862
          },
          countryCode: 'AUS',
          neighborhood: 'Centro',
          number: '12',
          state: 'SP',
          street: 'Rua Coronel Spínola de Castro',
          zipCode: '15015500'
        },
        archived: false,
        avatarUrl: 'assets/images/avatars/avatar.jpg',
        createdAt: '2020-08-04T19:26:48Z'
      }
    ],
    pageInfo: {
      hasNextPage: true,
      hasPreviousPage: false,
      page: 1,
      pageCount: 4,
      perPage: 2,
      totalCount: 7
    }
  })
}

run()
  .catch(err => {
    const error = err.isAxiosError ? err.toJSON() : err
    console.log('error: ', error)
    process.exit(1)
  })
