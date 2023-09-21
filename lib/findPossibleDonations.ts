import { GameState, ModName } from './types.d.ts'

// calculates all possible donations.
// A donation looks like: !spenden [item name] [amount] [target ModName]
// For this we check which items the player has and which mod still needs those items.
export const findPossibleDonations = (gameState: GameState): string[] => {
  const { mods, player } = gameState
  const { items } = player
  const possibleDonations: string[] = []
  for (const item of items) {
    for (const modName in mods) {
      const mod = mods[modName as ModName]
      const modItem = mod.items.find((modItem) => modItem.name === item.name)
      if (modItem && modItem.currentCount < modItem.requiredCount) {
        possibleDonations.push(
          `!spenden ${item.name} ${Math.min(
            modItem.requiredCount - modItem.currentCount,
            item.count
          )} @${modName}`
        )
      }
    }
  }
  return possibleDonations
}
