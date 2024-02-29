import { MESSAGE_TYPE } from "./constants"
import { 
  handleRegRequest, 
  handleCreateRoomRequest, 
  handleAddUserToRoomRequest,
  // handleAddShipsRequest,
  // handleAttackRequest,
  // handleRandomAttackRequest
} from "./controller/game.controller"

export const getRequestHandler = (type: string) => {
  return {
    [MESSAGE_TYPE.reg]: handleRegRequest,
    [MESSAGE_TYPE.create_room]: handleCreateRoomRequest,
    [MESSAGE_TYPE.add_user_to_room]: handleAddUserToRoomRequest,
    // [MESSAGE_TYPE.add_ships]: handleAddShipsRequest,
    // [MESSAGE_TYPE.attack]: handleAttackRequest,
    // [MESSAGE_TYPE.randomAttack]: handleRandomAttackRequest,
  }[type]
}