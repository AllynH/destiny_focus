/* eslint-disable camelcase */
export interface SingleCharacterInterface {
  readonly displayName: string
  readonly bungieGlobalDisplayName: string
  readonly membershipType: string
  readonly character_id: string
  readonly race_name: string
  readonly gender_name: string
  readonly destiny_class: string
  readonly emblem_hash: {
    icon: string
    background: string
    secondaryIcon?: string
    description?: string
  }
  readonly base_level: string
  readonly light: string
  readonly title: string
  readonly dateLastPlayed: string
  readonly minutesPlayedThisSession: string
  readonly minutesPlayedTotal: string
  readonly emblemBackgroundPath: string
  readonly membershipId?: string
}

export interface GetCharactersInterface {
  [key: string]: SingleCharacterInterface
}
export interface GetCharactersResponseInterface {
  Response: GetCharactersInterface
  statusCode: number
  ErrorStatus: string
}
/* eslint-enable camelcase */
