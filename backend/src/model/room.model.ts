import { type Player } from "./player.model"

export type Room = {
  roomId: number | string,
  roomUsers: {name: string, index: number | string}[],
}

export type Rooms = Room[]