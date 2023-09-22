import { APIPlayerState, PlayerState } from './types.d.ts'

/**
 * Fetches player state from API and converts to our format.
 */
export const fetchPlayerState = async (
  playerName: string
): Promise<PlayerState> => {
  const apiResponse = await fetch(
    `https://api.xicanmeow.de/api/game/basementdweller/info/user/${playerName}`
  )
  if (!apiResponse.ok)
    throw new Error(`Nutzername "${playerName}" wurde nicht gefunden 😔`)
  const apiState = await apiResponse.json()
  const playerState = parsePlayerState(apiState as APIPlayerState)
  return playerState
}

/**
 * The API returns items that we once had but now have 0 off.
 * In our world we do not want those items to be present in the player state.
 * Instead we want players to only have items they actually have at least 1 of.
 */
const noCount0Items = (item: { count: number }) => item.count !== 0

/**
 * Parses player state from API into our format.
 */
const parsePlayerState = (apiPlayerState: APIPlayerState): PlayerState => {
  const { infos, inventoryGegenstaende, inventoryHundefutter, spendenliste } =
    apiPlayerState
  return {
    name: infos.username,
    items: inventoryGegenstaende
      .map((item) => ({
        name: item.gegenstandName,
        count: item.anzahl,
      }))
      .filter(noCount0Items),
    food: inventoryHundefutter
      .map((food) => ({
        name: food.gegenstandName,
        count: food.anzahl,
      }))
      .filter(noCount0Items),
    donations: spendenliste.map((donation) => ({
      amount: donation.amount,
      targetMod: donation.ziel,
      name: donation.gegenstandName,
    })),
  }
}
