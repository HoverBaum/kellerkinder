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

// Get username from cli and exit, if not provided.
const username = Deno.args[0]
if (!username) {
  console.error(`Bitte gib deinen Nutzernamen an.
Beispiel:
deno run --allow-net https://raw.githubusercontent.com/HoverBaum/kellerkinder/main/cli-utils/donations.ts hoverbaum`)
  Deno.exit()
} else {
  console.log(`Hi ${username} 👋
Wir laden den aktuellen Stand...`)
}

const gameState = await fetchGameState(username)

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
