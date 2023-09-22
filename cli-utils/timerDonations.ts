import { fetchGameState } from '../lib/fetchGameState.ts'
import {
  donationToBotCommand,
  findPossibleDonations,
  onlyTimerDonations,
  totalDonationsCount,
} from '../lib/findPossibleDonations.ts'
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

const possibleDonations =
  findPossibleDonations(gameState).filter(onlyTimerDonations)

console.log('')
console.log('Mögliche Spenden an den Timer:')
if (possibleDonations.length === 0) {
  console.log('Keine 😔')
  Deno.exit()
}

possibleDonations.forEach((donation) => {
  console.log(donationToBotCommand(donation))
})

const totalDonations = totalDonationsCount(possibleDonations)

console.log('')
console.log(`Insgesamt kannst du ${totalDonations} Gegenstände spenden.`)
