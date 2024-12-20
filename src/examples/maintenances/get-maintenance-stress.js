// Exemplo baseado na documentação disponível em https://amonamarth.fieldcontrol.com.br/docs
// Os dados informados são apenas exemplos de testes e não representam a verdade

import { client } from '../../core/client.js'

async function run () {
  const REQUEST_QUANTITY = 1

  let completed = 0
  const promises = Array.from({ length: REQUEST_QUANTITY }).map(async (_, index) => {
    const staredAt = Date.now()

    return {
      index,
      response: await client.get('/maintenances', {
        params: {
          page: 1,
          perPage: 10
        }
      })
        .then(res => {
          completed++
          const completedAt = Date.now()
          Object.assign(res, {
            staredAt,
            completedAt,
            durationSeconds: (completedAt - staredAt) / 1000
          })
          console.log(`completed: ${completed}`)
          console.log('durationSeconds: ', res.durationSeconds)
          return res
        })
        .catch(err => {
          completed++
          const completedAt = Date.now()
          Object.assign(err, {
            staredAt,
            completedAt,
            durationSeconds: (completedAt - staredAt) / 1000
          })

          console.log(`completed: ${completed}`)
          console.log('durationSeconds: ', err.durationSeconds)
          throw err
        })
    }
  })

  const responses = await Promise.allSettled(promises)

  const successCount = responses.filter(result => result?.value?.response?.status / 100 === 2).length
  const errorCount = responses.length - successCount

  console.log('successCount: ', successCount)
  console.log('errorCount: ', errorCount)
}

run()
  .catch(err => {
    const error = err.isAxiosError ? err.toJSON() : err
    console.log('error: ', error)
    process.exit(1)
  })
