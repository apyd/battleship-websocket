export type Player = {
  id: string,
  name: string,
  password: string,
  wins: number
}

export type Winner = Pick<Player, 'name' | 'wins'>;

export type Game = {
  id: string,
  ships: Ship[],
}

export type RoomPlayer = Pick<Player, 'id' | 'name'>;

export type Room = {
  id: string,
  players: RoomPlayer[],
  game: Game | null
}

// possible data structures of data field that comes from client
export type RegisterPlayerRequestData = {
  name: string
  password: string
};

export type CreateRoomRequestData = {
  type: string,
  data: string,
  id: number
}

export type AddUserToRoomRequestData = {
  indexRoom: number | string
};

export type Ship = {
  position: {
    x: number,
    y: number
  },
  direction: boolean,
  length: number,
  type: "small" | "medium" | "large" | "huge"
}

export type AddShipsRequestData = {
  gameId: number | string,
  ships: Ship[]
  indexPlayer: number | string,
};

export type AttackRequestData = {
  gameId: number | string,
  x: number,
  y: number,
  indexPlayer: number | string,
}

export type RandomAttackRequestData = {
  gameId: number | string,
  indexPlayer: number | string,
}

export type ClientResponseData = RegisterPlayerRequestData | CreateRoomRequestData | AddUserToRoomRequestData | AddShipsRequestData | AttackRequestData | RandomAttackRequestData;

export type ClientResponse = {
  type: string,
  data: ClientResponseData;
  id: number
};

// possible data structures of data field that comes from server
export type RegisterPlayerResponseData = {
  name: string
  index: number | string
  error: boolean
  errorText: string
};

export type UpdateWinnersResponseData = Winner[]

export type UpdateRoomResponseData = {
  roomId: number | string
  roomUsers: Array<{name: string, index: number | string}>
}[]

export type CreateGameResponseData = {
  idGame: number | string,  
  idPlayer: number | string,
}

export type StartGameResponseData = {
  ships: Ship[],
  currentPlayerIndex: number | string
}

export type AttackResponseData = {
  position: {
    x: number,
    y: number
  },
  currentPlayerIndex: number | string,
  status: "miss" | "killed" | "shot"
}

export type TurnResponseData = {
  currentPlayer: number | string
}

export type FinishGameResponseData = {
  winPlayer : number | string
}

export type ServerProcessedData = RegisterPlayerResponseData | UpdateRoomResponseData | UpdateWinnersResponseData | CreateGameResponseData | StartGameResponseData | TurnResponseData | AttackResponseData | FinishGameResponseData;

export type MessageToSend = {
  type: string,
  data: ServerProcessedData
  id: number
};

export type SendMessageCallback = (message: MessageToSend) => void;

export type CommandsSequenceInput<T = ClientResponseData | unknown> = {
  data: T;
  callback: (data: ServerProcessedData) => void;
};

export type CommandsSequence = (input: CommandsSequenceInput) => CommandsSequenceInput