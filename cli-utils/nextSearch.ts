import { fetchPlayerState } from '../lib/fetchPlayerState.ts'
import { requireUsername } from './utils/requireUsername.ts'

const username = requireUsername()

const playerState = await fetchPlayerState(username)

if (playerState.lastSearchTimestamp === null) {
  console.log('Du hast noch nie gesucht, leg los 🐶')
  Deno.exit()
}

const lastSearch = new Date(playerState.lastSearchTimestamp)
const now = new Date()

const timeSinceLastSearch = now.getTime() - lastSearch.getTime()

// Useres can search every 30 Minutes.
const timeUntilNextSearch = 30 * 60 * 1000 - timeSinceLastSearch

if (timeUntilNextSearch <= 0) {
  console.log('Du kannst wieder suchen 🐶')
  Deno.exit()
} else {
  const minutes = Math.floor(timeUntilNextSearch / 1000 / 60)
  const seconds = Math.floor((timeUntilNextSearch / 1000) % 60)
  console.log(
    `Du musst noch warte 🐌
Noch: ${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')} Minuten`
  )
  Deno.exit()
}
