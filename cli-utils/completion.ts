/**
 * Util to see the current completion rate for mods.
 *
 * Example output:
 * DerElky         🔑 100%
 * Cebrox          🔑 90.5%
 * BenniDoubleU    🔑 100%
 * Dameya          🔒 80.4%
 * dinivateres     🔒 55%
 * eidechsefalke   🔒 64%
 * Furiouspeet     🔒 52.2%
 * Ma1ubi          🔒 66.3%
 * MsSummersun     🔒 65.8%
 * Tbi994          🔑 100%
 */

import { fetchAllModStates } from '../lib/fetchModState.ts'

const mods = await fetchAllModStates()

for (const mod of Object.values(mods)) {
  console.log(
    `${mod.name.padEnd(15, ' ')} ${mod.isKeyFound ? '🔑' : '🔒'} ${
      mod.completionRate
    }%`
  )
}
