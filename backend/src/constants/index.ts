export const MESSAGE_TYPE = {
  reg: 'reg',
  update_winners: 'update_winners',
  update_room: 'update_room',
  create_room: 'create_room',
  add_user_to_room: 'add_user_to_room',
  create_game: 'create_game',
  add_ships: 'add_ships',
  start_game: 'start_game',
  attack: 'attack',
  randomAttack: 'randomAttack',
  turn: 'turn',
  finish: 'finish',
} as const

export const MESSAGE_SEQUENCE = {
  [MESSAGE_TYPE.reg]: [MESSAGE_TYPE.reg, MESSAGE_TYPE.update_room, MESSAGE_TYPE.update_winners],
  [MESSAGE_TYPE.create_room]: [MESSAGE_TYPE.create_room, MESSAGE_TYPE.update_room],
  [MESSAGE_TYPE.add_user_to_room]: [MESSAGE_TYPE.add_user_to_room, MESSAGE_TYPE.update_room, MESSAGE_TYPE.create_game],
  [MESSAGE_TYPE.add_ships]: [MESSAGE_TYPE.add_ships, MESSAGE_TYPE.start_game, MESSAGE_TYPE.turn],
  [MESSAGE_TYPE.attack]: [MESSAGE_TYPE.attack, MESSAGE_TYPE.turn],
  [MESSAGE_TYPE.randomAttack]: [MESSAGE_TYPE.randomAttack, MESSAGE_TYPE.turn],
  [MESSAGE_TYPE.finish]: [MESSAGE_TYPE.finish, MESSAGE_TYPE.update_winners],
}

export const EXCLUDED_FROM_BROADCAST: string[] = [MESSAGE_TYPE.reg]
