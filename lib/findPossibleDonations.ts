import { Donation, GameState, ModName } from './types.d.ts'

// Finds all donations possible for the player in current game state.
export const findPossibleDonations = (gameState: GameState): Donation[] => {
  const { mods, player } = gameState
  const { items } = player
  const possibleDonations: Donation[] = []
  for (const modName in mods) {
    for (const item of items) {
      const mod = mods[modName as ModName]
      const modItem = mod.items.find((modItem) => modItem.name === item.name)
      if (modItem && modItem.currentCount < modItem.requiredCount) {
        possibleDonations.push({
          target: modName as ModName,
          item: item.name,
          amount: Math.min(
            modItem.requiredCount - modItem.currentCount,
            item.count
          ),
        })
      }
    }
  }
  // All items a player has which they can not donate to a mod, they can donate to the timer.
  const itemsNotDonated = items.filter((item) => {
    return !possibleDonations.find((donation) => donation.item === item.name)
  })
  for (const item of itemsNotDonated) {
    possibleDonations.push({
      target: 'Timer',
      item: item.name,
      amount: item.count,
    })
  }
  return possibleDonations
}

/**
 * Transforms a Donation into a command for the chatbot.
 * !spenden [item name] [amount] [target ModName or Timer]
 */
export const donationToBotCommand = (donation: Donation): string => {
  return `!spenden ${donation.item} ${donation.amount} ${
    donation.target !== 'Timer' ? '@' : ''
  }${donation.target}`
}

// Array.filter utility to only get mod donations.
export const onlyModDonations = (donation: Donation): boolean => {
  return donation.target !== 'Timer'
}

// Array.filter utility to only get timer donations.
export const onlyTimerDonations = (donation: Donation): boolean => {
  return donation.target === 'Timer'
}

/**
 * Counts how many unique items a list of donations contain.
 */
export const totalDonationsCount = (donationList: Donation[]): number => {
  const donationAmountsByItem = {} as { [key: string]: number }

  donationList.forEach((donation) => {
    if (donationAmountsByItem[donation.item]) {
      if (donationAmountsByItem[donation.item] < donation.amount) {
        donationAmountsByItem[donation.item] = donation.amount
      }
    } else {
      donationAmountsByItem[donation.item] = donation.amount
    }
  })

  const totalDonations = Object.values(donationAmountsByItem).reduce(
    (acc: number, curr: number) => acc + curr,
    0
  )

  return totalDonations
}
