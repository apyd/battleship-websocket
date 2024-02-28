import { Ship, Player, Room } from "../types"

type DB = {
  players: Player[],
  rooms: Room[]
}

const db: DB = {
  players: [],
  rooms: []
}

export default db