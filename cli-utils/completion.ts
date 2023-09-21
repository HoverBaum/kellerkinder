/**
 * Util to see the current completion rate for mods.
 */

import { fetchAllModStates } from '../lib/fetchModState.ts'

const mods = await fetchAllModStates()

for (const mod of Object.values(mods)) {
  console.log(`${mod.name.padEnd(15, ' ')} ${mod.completionRate}%`)
}
