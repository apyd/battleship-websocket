import { type Winner } from "../model/player.model"
import { type Room } from "../model/room.model"
// import { type Game } from "../model/game.model"

type DB = {
  players: {name: string, index: number | string}[],
  rooms: Room[],
  winners: Winner[],
  // games: Game[]
}

const db: DB = {
  players: [],
  rooms: [],
  winners: [],
  // games: []
}

export default db