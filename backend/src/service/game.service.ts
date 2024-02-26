import db from '../db/db'

export const updateRoom = (props: any) => {
  const { callback } = props
  try {
    const rooms = db.rooms.filter(room => room.roomUsers.length > 0)
    callback(rooms)
    return props
  } catch (error) {
    const errorText = error instanceof Error ? error.message : error
    console.error(errorText)
    callback([])
    return props
  }
}

export const updateWinners = (props: any) => {
  const { callback } = props
  try {
    const winners = [...db.winners]
    callback(winners)
    return props
  } catch (error) {
    const errorText = error instanceof Error ? error.message : error
    console.error(errorText)
    callback([])
    return props
  }
}

export const createRoom = (props: any) => {
  try {
    const player = db.players[db.players.length - 1]
    const newRoom = { roomId: db.rooms.length, roomUsers: [player]}
    db.rooms.push(newRoom)
    return props
  } catch (error) {
    const errorText = error instanceof Error ? error.message : error
    console.error(errorText)
    return props
  }
}

