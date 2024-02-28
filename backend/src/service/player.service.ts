import crypto from 'node:crypto'
import db from '../db/db'
import { CommandsSequenceInput, RegisterPlayerRequestData } from '../types'
import { getErrorMessage } from '../utils'

export const registerPlayer = (props: CommandsSequenceInput<RegisterPlayerRequestData>): CommandsSequenceInput<RegisterPlayerRequestData> => {
  let index = ''
  const { data: player, callback } = props
  try {
    if (!player.name || !player.password) {
      throw new Error('Name and password are required')
    }
    const existingPlayer = db.players.find(playerData => playerData.name === player.name)
    if(existingPlayer) {
      const isPasswordCorrect = existingPlayer.password === player.password
      callback({ name: existingPlayer.name, index: existingPlayer.id, error: !isPasswordCorrect, errorText: isPasswordCorrect ? '' : 'Name or password is incorrect'})
      return props
    }
    const id = crypto.randomUUID()
    db.players.push({...player, id, wins: 0})
    callback({ name: player?.name, index: id, error: false, errorText: '' })
    return props
  } catch (error) {
    const errorMessage = getErrorMessage(error)
    callback({ name: player?.name, index, error: true, errorText: errorMessage})
    return props
  }
}