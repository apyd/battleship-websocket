import db from '../db/db'

export const registerPlayer = (props: any) => {
  let index
  const { data: player, callback } = props
  try {
    if (!player.name || !player.password) {
      throw new Error('Name and password are required')
    }
    index = db.players.map(player => player.name).indexOf(player.name)
    if(index !== -1) {
      throw new Error('Player already exists')
    }
    callback({ name: player?.name, index, error: false, errorText: '' })
    return props
  } catch (error) {
    const errorText = error instanceof Error ? error.message : error
    console.error(errorText)
    callback({ name: player?.name, index, error: true, errorText})
    return props
  }
}