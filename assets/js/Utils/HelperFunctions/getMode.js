export const returnSimpleActivity = (m) => {
  switch (m) {
    case 'Raid':
    default:
      return m
    case 'Nightfall':
      return m
    case 'AllPvP':
    case 'Survival':
    case 'Control':
    case 'Elimination':
    case 'Clash':
    case 'Rumble':
      return 'AllPvP'
    case 'Gambit':
      return m
    case 'TrialsOfOsiris':
      return m
  }
}
