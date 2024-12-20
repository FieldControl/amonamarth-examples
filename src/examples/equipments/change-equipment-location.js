// Exemplo baseado na documentação disponível em https://amonamarth.fieldcontrol.com.br/docs
// Os dados informados são apenas exemplos de testes e não representam a verdade

import { client } from '../../core/client.js'
import { getData, getFistItem } from '../../core/utils.js'
import assert from 'node:assert'

async function run () {
  const equipment = await client.get('/equipments', {
    params: {
      page: 1,
      perPage: 1,
      numberEq: '1997'
    }
  }).then(getFistItem)

  const location = await client.get('/locations', {
    params: {
      page: 1,
      perPage: 1,
      documentNumberEq: '08980888015'
    }
  }).then(getFistItem)

  const updatedEquipment = await client.put(`/equipments/${equipment.id}`, {
    name: 'Ar condicionado Split com foto',
    archived: false,
    notes: 'Equipamento cadastrado pelo app do colaborador (atualizado)',
    number: '1997',
    qrCode: 'http://equipamentos.grupoimc.com.br/app/equipamentos/8469c863-0f37-4e58-a6f5-af2adfb20a82',
    equipmentType: {
      id: 'b894bdb9-b46b-4162-98a5-08c3b111a3a0'
    },
    location: {
      id: location.id
    }
  }).then(getData)

  console.log('updatedEquipment', updatedEquipment)
}

run()
  .catch(err => {
    const error = err.isAxiosError ? err.toJSON() : err
    console.log('error: ', error)
    process.exit(1)
  })
