import { pipe } from "../utils"
import { MESSAGE_TYPE, MESSAGE_SEQUENCE } from "../constants"
import { registerPlayer } from "../service/player.service"
import { 
  updateRoom, 
  updateWinners, 
  createRoom, 
  addUserToRoom, 
  createGame, 
  // addShips, 
  // startGame, 
  // turn, 
  // attack, 
  // randomAttack, 
  // finish 
} from "../service/game.service"
import { SendMessageCallback, ClientResponseData, ServerProcessedData, CommandsSequence } from "../types"

export const handleRegRequest = (data: ClientResponseData, sendMessage: SendMessageCallback): void => {  
  try {
    let commandIteration = 0
    const commandsSequence: CommandsSequence = pipe(registerPlayer, updateRoom, updateWinners)

    const callback = (data: ServerProcessedData) => {
      try {
        sendMessage({ 
          type: MESSAGE_SEQUENCE[MESSAGE_TYPE.reg][commandIteration],
          data,
          id: 0
        })
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

export const handleCreateRoomRequest = (data: ClientResponseData, sendMessage: SendMessageCallback): void => {
  let commandIteration = 1
  
  try {
    const commandsSequence: CommandsSequence = pipe(createRoom, updateRoom)

    const callback = (data: ServerProcessedData) => {
      try {
        sendMessage({ 
          type: MESSAGE_SEQUENCE[MESSAGE_TYPE.reg][commandIteration], 
          data,
          id: 0
        })
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

export const handleAddUserToRoomRequest = (data: ClientResponseData, sendMessage: SendMessageCallback): void => {
  let commandIteration = 1
  
  try {
    const commandsSequence: CommandsSequence = pipe(addUserToRoom, updateRoom, createGame)

    const callback = (data: ServerProcessedData) => {
      try {
        sendMessage({ 
          type: MESSAGE_SEQUENCE[MESSAGE_TYPE.add_user_to_room][commandIteration], 
          data,
          id: 0
        })
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

// export const handleAddShipsRequest = (data: ClientResponse, sendMessage: SendMessageCallback): void => {
//   let commandIteration = 1
  
//   try {
//     const commandsSequence: CommandsSequenceInput = pipe(addShips, startGame, turn)

//     const callback = (data: MessageToSend) => {
//       try {
//         sendMessage({ 
//           type: MESSAGE_SEQUENCE[MESSAGE_TYPE.add_ships][commandIteration], 
//           data,
//           id: 0
//         })
//         commandIteration++
//       }
//       catch (error) {
//         console.log('callback error')
//       }
//     }

//     commandsSequence({data, callback})

//   } catch (error) {
//     console.log('error')
//   }
// }

// export const handleAttackRequest = (data: ClientResponse, sendMessage: SendMessageCallback): void => {}

// export const handleRandomAttackRequest = (data: ClientResponse, sendMessage: SendMessageCallback): void => {}

