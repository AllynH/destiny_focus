import { PgcrTypes } from '../../Data/destinyEnums'

export type pgcrStatType =
  'kills' |
  'deaths' |
  'assists' |
  'kdr' |
  'kda' |
  'guardianKills' |
  'guardianDeaths' |
  'motesBanked' |
  'motesLost' |
  'motesDenied' |
  'motesDeposited' |
  'damage' |
  'duration' |
  'score' |
  'superKills' |
  'grenadeKills'

export type PgcrSplashValuesInterface = {
  // eslint-disable-next-line no-unused-vars
  [_key in PgcrTypes]: {
    heading: string[],
    values: pgcrStatType[]
  }
}

export const pgcrSplashCategoryValues: PgcrSplashValuesInterface = {
  /* PvE modes */
  Raid: { heading: ['K', 'D', 'K/D R', 'S. K', 'Dur'], values: ['kills', 'deaths', 'kdr', 'superKills', 'duration'] },
  Strike: { heading: ['K', 'D', 'K/D R', 'S. K', 'Dur'], values: ['kills', 'deaths', 'kdr', 'superKills', 'duration'] },
  Nightfall: { heading: ['K', 'D', 'A', 'Score'], values: ['kills', 'deaths', 'assists', 'score'] },

  /* Gambit modes: */
  Gambit: {
    heading: ['K', 'G. K', 'D', 'G. D', 'MB', 'ML', 'MD', 'Dam'],
    values: ['kills', 'guardianKills', 'deaths', 'guardianDeaths', 'motesBanked', 'motesLost', 'motesDenied', 'damage']
  },

  /* PvP modes: */
  AllPvP: { heading: ['K', 'D', 'A', 'K/D R'], values: ['kills', 'deaths', 'assists', 'kdr'] },
  Survival: { heading: ['K', 'D', 'A', 'K/D R'], values: ['kills', 'deaths', 'assists', 'kdr'] },
  AllMayhem: { heading: ['K', 'D', 'S. K', 'G. K', 'K/D R'], values: ['kills', 'deaths', 'superKills', 'grenadeKills', 'kdr'] },
  Mayhem: { heading: ['K', 'D', 'S. K', 'G. K', 'K/D R'], values: ['kills', 'deaths', 'superKills', 'grenadeKills', 'kdr'] },
  Control: { heading: ['K', 'D', 'A', 'K/D R'], values: ['kills', 'deaths', 'assists', 'kdr'] },
  'Control: Quickplay': { heading: ['K', 'D', 'A', 'K/D R'], values: ['kills', 'deaths', 'assists', 'kdr'] },
  Clash: { heading: ['K', 'D', 'A', 'K/D R'], values: ['kills', 'deaths', 'assists', 'kdr'] },
  IronBanner: { heading: ['K', 'D', 'A', 'K/D R'], values: ['kills', 'deaths', 'assists', 'kdr'] },
  Countdown: { heading: ['K', 'D', 'A', 'K/D R'], values: ['kills', 'deaths', 'assists', 'kdr'] },
  TrialsOfOsiris: { heading: ['K', 'D', 'A', 'K/D R'], values: ['kills', 'deaths', 'assists', 'kdr'] },
}


