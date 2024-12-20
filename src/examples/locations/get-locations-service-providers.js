// Exemplo baseado na documentação disponível em https://amonamarth.fieldcontrol.com.br/docs
// Os dados informados são apenas exemplos de testes e não representam a verdade

import { client } from '../../core/client.js'
import { getData, getFistItem } from '../../core/utils.js'
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
      nameEq: '001 - Ar condicionado'
    }
  }).then(getFistItem)

  const result = await client.get(`/locations/${location.id}/service-providers`, {
    params: {
      segmentId: segment.id
    }
  }).then(getData)

  assert.deepEqual(result, {
    items: [
      {
        id: '23adcaa6-fd7f-48c3-b42d-57df81993edc',
        segment: {
          id: '1d8a6476-2f12-4766-8941-87d4ee4baf45'
        },
        maintenanceTypes: [
          {
            id: '574a1a6d-3f29-4356-8cdb-29bdb3c3ab32'
          },
          {
            id: '9d1c80ea-ceba-478a-8bca-3525b9dba873'
          }
        ],
        company: {
          id: '5dc173b9-f3c7-5fff-a5f9-f4bcecd3cdb9'
        }
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

  const serviceProviderDetail = await client.get(`/locations/${location.id}/service-providers/${result.items[0].id}`).then(getData)

  assert.deepEqual(serviceProviderDetail, {
    id: '23adcaa6-fd7f-48c3-b42d-57df81993edc',
    segment: {
      id: '1d8a6476-2f12-4766-8941-87d4ee4baf45',
      name: '001 - Ar condicionado'
    },
    maintenanceTypes: [
      {
        id: '574a1a6d-3f29-4356-8cdb-29bdb3c3ab32',
        name: 'Manutenção corretiva'
      },
      {
        id: '9d1c80ea-ceba-478a-8bca-3525b9dba873',
        name: 'Instalação'
      }
    ],
    company: {
      id: '5dc173b9-f3c7-5fff-a5f9-f4bcecd3cdb9',
      name: 'Field control - Fornecedor 8817'
    }
  })
}

run()
  .catch(err => {
    const error = err.isAxiosError ? err.toJSON() : err
    console.log('error: ', error)
    process.exit(1)
  })
