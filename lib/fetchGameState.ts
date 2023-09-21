import { fetchAllModStates } from './fetchModState.ts'
import { fetchPlayerState } from './fetchPlayerState.ts'
import { GameState } from './types.d.ts'

/**
 * Gets the current state of the game.
 * Basis for all utils.
 */
export const fetchGameState = async (username: string): Promise<GameState> => {
  // Fetch all modState
  const mods = await fetchAllModStates()

  // Fetch playerState
  const player = await fetchPlayerState(username)

  // Return game state
  return {
    mods,
    player,
  }
}
