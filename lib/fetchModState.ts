import { APIMOdState, ModName, ModState, ModStateMap } from './types.d.ts'

/**
 * Fetches state for one mod from API and converts to our format.
 */
export const fetchModState = async (modName: ModName): Promise<ModState> => {
  const apiState = await fetch(
    `https://api.xicanmeow.de/api/game/basementdweller/info/mod/${modName}`
  ).then((res) => res.json())
  const modState = parseAPIModState(apiState as APIMOdState)
  return modState
}

/**
 * Fetch the state of all mods in a ModStateMap.
 */
export const fetchAllModStates = async (): Promise<ModStateMap> => {
  const DerElky = await fetchModState('DerElky')
  const Cebrox = await fetchModState('Cebrox')
  const BenniDoubleU = await fetchModState('BenniDoubleU')
  const Dameya = await fetchModState('Dameya')
  const dinivateres = await fetchModState('dinivateres')
  const eidechsefalke = await fetchModState('eidechsefalke')
  const Furiouspeet = await fetchModState('Furiouspeet')
  const Ma1ubi = await fetchModState('Ma1ubi')
  const MsSummersun = await fetchModState('MsSummersun')
  const Tbi994 = await fetchModState('Tbi994')
  return {
    DerElky,
    Cebrox,
    BenniDoubleU,
    Dameya,
    dinivateres,
    eidechsefalke,
    Furiouspeet,
    Ma1ubi,
    MsSummersun,
    Tbi994,
  }
}

/**
 * Parses mode state from API into our format.
 */
const parseAPIModState = (modState: APIMOdState): ModState => {
  const { infos, gegenstaende, waffe, fluchtobjekt } = modState
  const items = gegenstaende.map((item) => ({
    currentCount: item.anzahl,
    name: item.gegenstandName,
    requiredCount: item.benoetigteAnzahl,
  }))
  const weapon = {
    name: waffe.name,
    items: waffe.teile.map((item) => ({
      currentCount: item.anzahl,
      name: item.gegenstandName,
      requiredCount: item.benoetigteAnzahl,
    })),
  }
  const flightObject = {
    name: fluchtobjekt.name,
    items: fluchtobjekt.teile.map((item) => ({
      currentCount: item.anzahl,
      name: item.gegenstandName,
      requiredCount: item.benoetigteAnzahl,
    })),
  }
  const totalCounts = items
    .concat(weapon.items)
    .concat(flightObject.items)
    .reduce(
      (all, item) => {
        all.currentCount += item.currentCount
        all.totalCount += item.requiredCount
        return all
      },
      { totalCount: 0, currentCount: 0 }
    )
  const completionRate =
    Math.floor((totalCounts.currentCount / totalCounts.totalCount) * 1000) / 10

  return {
    name: infos.name as ModName,
    isKeyFound: infos.zellenschluesselGefunden,
    keyFinder: infos.zellenschluesselGefundenVon || undefined,
    completionRate,
    items,
    weapon,
    flightObject,
  }
}
