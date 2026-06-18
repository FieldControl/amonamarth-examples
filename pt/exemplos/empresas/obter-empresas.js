// Exemplo baseado na documentação disponível em https://amonamarth.fieldcontrol.com.br/docs
// Os dados informados são apenas exemplos de testes e não representam a verdade

import { client } from '../../../core/client.js'
import { getData } from '../../../core/utils.js'

async function run () {
  // Obter empresas com nome exato igual a "Field Control"
  // Apenas um item por página
  // Página um ou primeira página
  await client.get('/companies', {
    params: {
      page: 1,
      perPage: 1,
      nameEq: 'Field Control'
    }
  }).then(getData)

  // Obter empresas com nome exato igual a "Field Control"
  // Apenas dois itens por página
  // Página um ou primeira página
  // Da mais antiga para a mais recente
  await client.get('/companies', {
    params: {
      page: 1,
      perPage: 2,
      nameEq: 'Field Control',
      orderBy: 'createdAt',
      direction: 'asc'
    }
  }).then(getData)

  // Obter empresas que possuem o nome idêntico a "Resolv"
  // Apenas um item por página
  // Página um ou primeira página
  await client.get('/companies', {
    params: {
      page: 1,
      perPage: 1,
      nameEq: 'Resolv'
    }
  }).then(getData)

  // Apenas dois itens por página
  // Página um ou primeira página
  // Com o nome de Z a A
  await client.get('/companies', {
    params: {
      page: 1,
      perPage: 2,
      orderBy: 'name',
      direction: 'desc'
    }
  }).then(getData)

  // Apenas dois itens por página
  // Página um ou primeira página
  // Mais distante para mais proxima
  // Campo "distanceRelativeTo" deve ser uma string contendo a latitude e longitude, respectivamente ("latitude,longitude")
  // Campo "distanceRelativeTo" só pode ser informado se o campo orderColumn for igual a "distance"
  // Empresas sem coordenadas ficarão no final da lista
  await client.get('/companies', {
    params: {
      page: 1,
      perPage: 2,
      orderBy: 'distance',
      direction: 'desc',
      distanceRelativeTo: '37.7749,-122.4194'
    }
  }).then(getData)
}

run()
  .catch(err => {
    const error = err.isAxiosError ? err.toJSON() : err
    console.log('error: ', error)
    process.exit(1)
  })
