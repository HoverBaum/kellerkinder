import { APIPlayerState, PlayerState } from './types.d.ts'

/**
 * Fetches player state from API and converts to our format.
 */
export const fetchPlayerState = async (
  playerName: string
): Promise<PlayerState> => {
  const apiState = await fetch(
    `https://api.xicanmeow.de/api/game/basementdweller/info/user/${playerName}`
  ).then((res) => res.json())
  const playerState = parsePlayerState(apiState as APIPlayerState)
  return playerState
}

/**
 * Parses player state from API into our format.
 */
const parsePlayerState = (apiPlayerState: APIPlayerState): PlayerState => {
  const { infos, inventoryGegenstaende, inventoryHundefutter, spendenliste } =
    apiPlayerState
  return {
    name: infos.username,
    items: inventoryGegenstaende.map((item) => ({
      name: item.gegenstandName,
      count: item.anzahl,
    })),
    food: inventoryHundefutter.map((food) => ({
      name: food.gegenstandName,
      count: food.anzahl,
    })),
    donations: spendenliste.map((donation) => ({
      amount: donation.amount,
      targetMod: donation.ziel,
      name: donation.gegenstandName,
    })),
  }
}
