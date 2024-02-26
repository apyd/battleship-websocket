export const MESSAGE_TYPE = {
  reg: 'reg',
  update_winners: 'update_winners',
  create_room: 'create_room',
  add_user_to_room: 'add_user_to_room',
  update_room: 'update_room',
  add_ships: 'add_ships',
  start_game: 'start_game',
  attack: 'attack',
  randomAttack: 'randomAttack',
  turn: 'turn',
  finish: 'finish',
}

export const MESSAGE_SEQUENCE = {
  [MESSAGE_TYPE.reg]: [MESSAGE_TYPE.reg, MESSAGE_TYPE.update_room, MESSAGE_TYPE.update_winners],
  [MESSAGE_TYPE.create_room]: [MESSAGE_TYPE.create_room, MESSAGE_TYPE.update_room]
}