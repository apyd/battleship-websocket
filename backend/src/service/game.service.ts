import crypto from 'node:crypto'
import db from '../db/db'
import { AddUserToRoomRequestData, CommandsSequenceInput, CreateRoomRequestData } from '../types'

export const updateRoom = (props: CommandsSequenceInput<any>): CommandsSequenceInput<any> => {
  const { callback } = props
  try {
    const rooms = db.rooms.filter(room => room.players.length > 0)
    const mappedRooms = rooms.map(room => { 
      return { roomId: room.id, roomUsers: room.players.map(({name, id}) => {
        return { name, index: id }
      }) }
    })
    callback(mappedRooms)
    return props
  } catch (error) {
    const errorText = error instanceof Error ? error.message : error
    console.error(errorText)
    callback([])
    return props
  }
}

export const updateWinners = (props: CommandsSequenceInput<any>): CommandsSequenceInput<any> => {
  const { callback } = props
  try {
    const winners = db.players.map(player => {
      return { 
        name: player.name, 
        wins: player.wins 
      }
    })
    callback(winners)
    return props
  } catch (error) {
    const errorText = error instanceof Error ? error.message : error
    console.error(errorText)
    callback([])
    return props
  }
}

export const createRoom = (props: CommandsSequenceInput<CreateRoomRequestData>): CommandsSequenceInput<CreateRoomRequestData> => {
  try {
    // TODO: I need to get right player here - how do I know which one is the right one?
    const player = db.players[db.players.length - 1]
    // TODO: I need PlayerID here.
    const newRoom = { id: String(crypto.randomUUID()), players: [{id: 'db.players.length - 1', name: player.name}], game: null}
    db.rooms.push(newRoom)
    return props
  } catch (error) {
    const errorText = error instanceof Error ? error.message : error
    console.error(errorText)
    return props
  }
}

export const addUserToRoom = (props: CommandsSequenceInput<AddUserToRoomRequestData>): CommandsSequenceInput<AddUserToRoomRequestData> => {
  const { data } = props
  const { indexRoom } = data
  try {
    const room = db.rooms.find(room => room.id === indexRoom)
    const player = db.players[db.players.length - 1]
    if(room) {
      room.players.push({ 
        name: player.name,
        // TODO I need to get right player here - how do I know which one is the right one? I need it's ID
        id: 'string'
      })
    }
    return props
  } catch (error) {
    const errorText = error instanceof Error ? error.message : error
    console.error(errorText)
    return props
  }
}

export const createGame = (props: CommandsSequenceInput<string>): CommandsSequenceInput<string> => {
  const { callback } = props
  try {
    // console.log('players:', players)
    const game = { 
      id: crypto.randomUUID(), 
      ships: []
    }
    db.rooms[db.rooms.length - 1].game = game
    // TODO: I need to get right player here - how do I know which one is the right one? I need it's ID
    callback({idGame: game.id, idPlayer: ''})
    return props
  } catch (error) {
    const errorText = error instanceof Error ? error.message : error
    // console.log('game created error')
    console.error(errorText)
    return props
  }
}

// export const addShips = (props: CommandsSequenceInput) => {}

// export const startGame = (props: CommandsSequenceInput) => {}

// export const turn = (props: CommandsSequenceInput) => {}

// export const attack = (props: CommandsSequenceInput) => {}

// export const randomAttack= (props: CommandsSequenceInput) => {}

// export const finish = (props: CommandsSequenceInput) => {}