// Ejemplo basado en la documentación disponible en https://amonamarth.fieldcontrol.com.br/docs
// Los datos proporcionados son solo ejemplos de prueba y no representan la realidad

import { client } from '../../../core/client.js'
import { getData } from '../../../core/utils.js'

async function run () {
  // Obtener empresas con nombre exacto igual a "Field Control"
  // Solo un elemento por página
  // Página uno o primera página
  await client.get('/companies', {
    params: {
      page: 1,
      perPage: 1,
      nameEq: 'Field Control'
    }
  }).then(getData)

  // Obtener empresas con nombre exacto igual a "Field Control"
  // Solo dos elementos por página
  // Página uno o primera página
  // De más antiguo a más reciente
  await client.get('/companies', {
    params: {
      page: 1,
      perPage: 2,
      nameEq: 'Field Control',
      orderBy: 'createdAt',
      direction: 'asc'
    }
  }).then(getData)

  // Obtener empresas que tengan un nombre idéntico a "Resolv"
  // Solo un elemento por página
  // Página uno o primera página
  await client.get('/companies', {
    params: {
      page: 1,
      perPage: 1,
      nameEq: 'Resolv'
    }
  }).then(getData)

  // Solo dos elementos por página
  // Página uno o primera página
  // Con el nombre de la Z a la A
  await client.get('/companies', {
    params: {
      page: 1,
      perPage: 2,
      orderBy: 'name',
      direction: 'desc'
    }
  }).then(getData)

  // Solo dos elementos por página
  // Página uno o primera página
  // De más lejano a más cercano
  // El campo "distanceRelativeTo" debe ser una cadena que contenga la latitud y la longitud, respectivamente ("latitud,longitud")
  // El campo "distanceRelativeTo" solo puede proporcionarse si el campo orderColumn es igual a "distance"
  // Las empresas sin coordenadas se colocarán al final de la lista
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
