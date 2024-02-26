import { registerPlayer } from "../service/player.service"
import { pipe } from "../utils"
import { MESSAGE_TYPE, MESSAGE_SEQUENCE } from "../constants"
import { createRoom, updateRoom, updateWinners } from "../service/game.service"

export const onRegistration = (ws: any, data: any) => {
  let commandIteration = 0
  
  try {
    const commandsSequence = pipe(registerPlayer, updateRoom, updateWinners)

    const callback = (processedData: any) => {
      try {
        const data = JSON.stringify(processedData)
        ws.send(JSON.stringify({ 
          type: MESSAGE_SEQUENCE[MESSAGE_TYPE.reg][commandIteration], 
          data,
          id: 0
        }))
        commandIteration++
      }
      catch (error) {
        console.log('callback error')
      }
    }

    commandsSequence({data, callback})

  } catch (error) {
    console.log('error')
  }
}  

export const onCreateRoom = (ws: any, data: any) => {
  let commandIteration = 1
  
  try {
    console.log('try')
    const commandsSequence = pipe(createRoom, updateRoom)

    const callback = (processedData: any) => {
      try {
        const data = JSON.stringify(processedData)
        console.log('callback called', data)
        ws.send(JSON.stringify({ 
          type: MESSAGE_SEQUENCE[MESSAGE_TYPE.create_room][commandIteration], 
          data,
          id: 0
        }))
        commandIteration++
      }
      catch (error) {
        console.log('callback error')
      }
    }

    commandsSequence({data, callback})

  } catch (error) {
    console.log('error')
  }
}
