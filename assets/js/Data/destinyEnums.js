/* eslint-disable import/prefer-default-export */
// Don't want to export default as I plan on adding to this file.
// export default BASIC_ACTIVITY_MODES

export const BASIC_ACTIVITY_MODES = {
  2: 'Story',
  3: 'Strike',
  4: 'Raid',
  5: 'AllPvP',
  6: 'Patrol',
  7: 'AllPvE',
  10: 'Control',
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

export const PROGRESSION_HASHES = {
  Glory: 1647151960, // 5500
  Valor: 2083746873, // 2000
  Infamy: 3008065600, // 15000
}

export const PROGRESSION_DATA = {
  Glory: { hash: 1647151960, maxRank: 5500, streakHash: 2572719399 },
  Valor: { hash: 2083746873, maxRank: 2000, streakHash: 2203850209 },
  Infamy: { hash: 3008065600, maxRank: 15000, streakHash: 2939151659 },
}
