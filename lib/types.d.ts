/**
 * We make our own types, because we like to think in English.
 * Also means we can adopt objects for what we want to do with them.
 */

export type ModName =
  | 'DerElky'
  | 'Cebrox'
  | 'BenniDoubleU'
  | 'Dameya'
  | 'dinivateres'
  | 'eidechsefalke'
  | 'Furiouspeet'
  | 'Ma1ubi'
  | 'MsSummersun'
  | 'Tbi994'

export type ModStateMap = {
  [key in ModName]: ModState
}

export type GameState = {
  mods: ModStateMap
  player: PlayerState
}

export type PlayerItem = {
  count: number
  name: string
}

export type PlayerDonation = {
  amount: number
  name: string
  targetMod: ModName
}

export type PlayerState = {
  name: string
  lastSearchTimestamp: string | null
  items: PlayerItem[]
  food: PlayerItem[]
  donations: PlayerDonation[]
}

export type BasementItem = {
  requiredCount: number
  name: string
  currentCount: number
}

export type ModState = {
  name: ModName
  isKeyFound: boolean
  keyFinder?: string
  completionRate: number
  items: BasementItem[]
  weapon: {
    name: string
    items: BasementItem[]
  }
  flightObject: {
    name: string
    items: BasementItem[]
  }
}

export type APIBasementItem = {
  anzahl: number
  gegenstandName: string
  benoetigteAnzahl: number
}

export type APIMOdState = {
  infos: {
    name: string
    zellenschluesselGefunden: boolean
    zellenschluesselGefundenVon: string
  }
  gegenstaende: APIBasementItem[]
  waffe: {
    name: string
    teile: APIBasementItem[]
  }
  fluchtobjekt: {
    name: string
    teile: APIBasementItem[]
  }
}

export type APIPlayerItem = {
  anzahl: number
  gegenstandName: string
}

export type APIPlayerDonation = {
  amount: number
  gegenstandName: string
  ziel: ModName
}

export type APIPlayerState = {
  infos: {
    username: string
    lastSuchenTimestamp: string | null
    lastSchnueffelnTimestamp: string | null
    countSuchen: number
    countSchnueffeln: number
    countBegleittierbons: number
  }
  inventoryGegenstaende: APIPlayerItem[]
  inventoryHundefutter: APIPlayerItem[]
  spendenliste: APIPlayerDonation[]
}
