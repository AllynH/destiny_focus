/* eslint-disable import/prefer-default-export */
// Don't want to export default as I plan on adding to this file.
// export default BASIC_ACTIVITY_MODES

interface ActivityModeInterface {
  [key: number]: string
}

export const BASIC_ACTIVITY_MODES: ActivityModeInterface = {
  2: 'Story',
  3: 'Strike',
  4: 'Raid',
  5: 'AllPvP',
  6: 'Patrol',
  7: 'AllPvE',
  10: 'Control',
  73: 'Control: Quickplay',
  12: 'Clash',
  46: 'Nightfall',

  // Unused?
  15: 'CrimsonDoubles',
  16: 'Nightfall',
  19: 'IronBanner',
  43: 'IronBanner', // IB Control:
  25: 'AllMayhem',
  31: 'Supremacy',
  37: 'Survival',
  38: 'Countdown',
  39: 'TrialsOfTheNine',
  40: 'Social',
  48: 'Rumble',
  50: 'Doubles',
  58: 'HeroicAdventure',
  59: 'Showdown',
  60: 'Lockdown',
  61: 'Scorched',
  63: 'Gambit',
  65: 'Breakthrough',
  66: 'BlackArmoryRun',
  67: 'Salvage',
  75: 'GambitPrime',
  76: 'Reckoning',
  77: 'Menagerie',
  78: 'VexOffensive',
  79: 'NightmareHunt',
  80: 'Elimination',
  81: 'Momentum',
  82: 'Dungeon',
  83: 'Sundial',
  84: 'TrialsOfOsiris',
}

export type ProgressionNameKey = 'Glory' | 'Valor' | 'Infamy' | 'Trials' | 'Vanguard'

export interface SingleProgressionInterface {
  hash: number
  maxRank: number
  streakHash: number
}

export type ProgressionInterface = {
  // eslint-disable-next-line no-unused-vars
  [_key in ProgressionNameKey]: SingleProgressionInterface
}

export const PROGRESSION_DATA: ProgressionInterface = {
  Glory: { hash: 1647151960, maxRank: 5500, streakHash: 2572719399 },
  Valor: { hash: 2083746873, maxRank: 10000, streakHash: 2203850209 },
  Infamy: { hash: 3008065600, maxRank: 15000, streakHash: 2939151659 },
  Vanguard: { hash: 457612306, maxRank: 10000, streakHash: 600547406 },
  Trials: { hash: 2755675426, maxRank: 10000, streakHash: 70699614 },
}

interface WeaponTypeInterface {
  readonly kinetic: number
  readonly energy: number
  readonly power: number
}

export type WeaponTypeList = keyof WeaponTypeInterface

export const WEAPON_TYPES: WeaponTypeInterface = {
  kinetic: 1498876634,
  energy: 2465295065,
  power: 953998645,
}

// export type TrialsPassageKey =
//   'Passage of Mercy' |
//   'Passage of Ferocity' |
//   'Passage of Confidence' |
//   'Passage of Wisdom' |
//   'Passage of Wealth'
export type TrialsPassageKey = 'Mercy' | 'Ferocity' | 'Confidence' | 'Wealth' | 'Wisdom'

interface SingleTrialsCardInterface {
  hash: number
  name: string
}

export type TrialsCardInterface = {
  // eslint-disable-next-line no-unused-vars
  [_key in TrialsPassageKey]: SingleTrialsCardInterface
}

export const TRIALS_CARD_DATA: TrialsCardInterface = {
  Mercy: { hash: 1600065451, name: 'Passage of Mercy' }, // Duplicate - correct value
  Confidence: { hash: 1181381245, name: 'Passage of Confidence' }, // Duplicate - guessing value.
  Ferocity: { hash: 7665310, name: 'Passage of Ferocity' },
  Wealth: { hash: 2879309661, name: 'Passage of Wealth' },
  Wisdom: { hash: 2001563200, name: 'Passage of Wisdom' }, // Duplicate - guessing value.
  // Ferocity: { hash: 1274359594, name: 'Passage of Ferocity' }, // Duplicate - guessing value.
  // Wealth: { hash: 2994359731, name: 'Passage of Wealth' }, // Duplicate - guessing value.
  // Mercy: { hash: 3125852681, name: 'Passage of Mercy' },
  // Confidence: { hash: 2512224275, name: 'Passage of Confidence' },
  // Wisdom: { hash: 3937592460, name: 'Passage of Wisdom' },
}

export type PgcrTypes =
  /* PvE Modes */
  | 'Raid'
  | 'Strike'
  | 'Nightfall'
  /* Gambit" */
  | 'Gambit'
  /* PvP modes */
  | 'AllPvP'
  | 'Survival'
  | 'AllMayhem'
  | 'Mayhem'
  | 'Control'
  | 'Control: Quickplay'
  | 'Clash'
  | 'IronBanner'
  | 'Countdown'
  | 'TrialsOfOsiris'

export type StandingType = 'Victory' | 'Defeat' | ''

export type ExtendedDataTypes =
  | 'bankOverage'
  | 'blockerKills'
  | 'highValueKills'
  | 'invaderDeaths'
  | 'invaderKills'
  | 'invasionDeaths'
  | 'invasionKills'
  | 'invasions'
  | 'largeBlockersSent'
  // "medals_pvecomp_medal_denied" |
  | 'mediumBlockersSent'
  | 'mobKills'
  | 'motesDenied'
  | 'motesDeposited'
  | 'motesLost'
  | 'motesPickedUp'
  | 'precisionKills'
  | 'primevalDamage'
  | 'primevalHealing'
  | 'primevalKills'
  | 'smallBlockersSent'
  | 'weaponKillsAbility'
  | 'weaponKillsGrenade'
  | 'weaponKillsMelee'
  | 'weaponKillsSuper'

/*
  These stats are removed from the ChartDropDown Component.
  Most of these don't hold data, or don't contain integer data sets.
*/
export const RemovedStats = [
  'completed',
  "completionReason",
  'fireteamId',
  'medals_pvecomp_medal_denied',
  'allMedalsEarned',
  'medalUnknown',
]
