import { MESSAGE_TYPE } from "./constants"
import { onRegistration, onCreateRoom } from "./controller/game.controller"

export const processData = (type: string) => {
  return {
    [MESSAGE_TYPE.reg]: onRegistration,
    [MESSAGE_TYPE.create_room]: onCreateRoom,
    // [MESSAGE_TYPE.add_user_to_room]: onAddUserToRoom,
    // [MESSAGE_TYPE.add_ships]: onAddShips, 
    // [MESSAGE_TYPE.attack]: attack, 
    // [MESSAGE_TYPE.randomAttack]: randomAttack, 
    // [MESSAGE_TYPE.update_winners]: updateWinners, 
    // [MESSAGE_TYPE.add_user_to_room]: addUserToRoom, 
    // [MESSAGE_TYPE.update_room]: updateRoom, 
    // [MESSAGE_TYPE.start_game]: startGame, 
    // [MESSAGE_TYPE.turn]: turn, 
    // [MESSAGE_TYPE.finish]: finish
  }[type]
}