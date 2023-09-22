/**
 * Util for donations a player can currently do.
 *
 * ## Usage:
 * deno run --allow-net cli-utils/donations.ts [username]
 *
 * ## Example output:
 * Hi hoverbaum 👋
 * Wir laden den aktuellen Stand...
 *
 * Mögliche Spenden:
 * !spenden Lasagne 1 @Cebrox
 *
 * Denk daran: Mods müssen für Spenden im Chat sein 🙃
 */

import { fetchGameState } from '../lib/fetchGameState.ts'
import { findPossibleDonations } from '../lib/findPossibleDonations.ts'
import { requireUsername } from './utils/requireUsername.ts'

const username = requireUsername()
console.log('Wir laden den aktuellen Stand...')

let gameState
try {
  gameState = await fetchGameState(username)
} catch (e) {
  console.error('🚨 ' + e.message)
  Deno.exit()
}

const possibleDonations = findPossibleDonations(gameState)

console.log('')
console.log('Mögliche Spenden:')
if (possibleDonations.length === 0) {
  console.log('Keine 😔')
  Deno.exit()
}
possibleDonations.forEach((donation) => console.log(donation))
console.log('')
console.log('Denk daran: Mods müssen für Spenden im Chat sein 🙃')
