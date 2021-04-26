import { calculateKillDeathRatio } from '../../Utils/HelperFunctions/KdrFunctions'
import { returnSimpleActivity } from '../../Utils/HelperFunctions/getMode'

export function parsePgcrData(entry, mode, activeUserId) {
  const completedDiv = (s) => {
    if (s) {
      return 'pgcr_splash-completed'
    }
    return 'pgcr_splash-failed'
  }

  const membershipId = entry.player?.destinyUserInfo?.membershipId

  const setActive = Boolean(membershipId === activeUserId)
  const activeUser = setActive ? 'active' : ''

  const username = entry.player?.destinyUserInfo?.displayName
  const kills = entry.values?.kills?.basic?.value
  const deaths = entry.values?.deaths?.basic?.value
  const assists = entry.values?.assists?.basic?.value
  const score = entry.score?.basic?.value
  const kdr = calculateKillDeathRatio(kills, deaths)
  const standing = entry.values?.completed?.basic?.displayValue === 'Yes'
  const completed = completedDiv(standing)
  const playerIcon = entry.player?.destinyUserInfo?.iconPath

  const weaponKillsSuper = entry.extended.values.weaponKillsSuper.basic.value
  const activityDurationSeconds = entry.values.activityDurationSeconds.basic.displayValue

  // Gambit:
  const primevalDamage = entry.extended?.values?.primevalDamage?.basic?.value
  const invasionKills = entry.extended?.values?.invasionKills?.basic?.value
  const invaderKills = entry.extended?.values?.invaderKills?.basic?.value
  const guardianKills = invasionKills + invaderKills
  const invasionDeaths = entry.extended?.values?.invasionDeaths?.basic?.value
  const invaderDeaths = entry.extended?.values?.invaderDeaths?.basic?.value
  const guardianDeaths = invasionDeaths + invaderDeaths
  const motesLost = entry.extended?.values?.motesLost?.basic?.value
  const motesDeposited = entry.extended?.values?.motesDeposited?.basic?.value
  const motesDenied = entry.extended?.values?.motesDenied?.basic?.value

  const iconStyle = {
    backgroundImage: `url(https://www.bungie.net${playerIcon})`,
    height: 30,
    width: 30,
    backgroundSize: 'contain',
  }
  const returnActivityData = (m) => {
    const genericData = {
      username,
      iconStyle,
      activeUser,
      membershipId,
    }
    switch (returnSimpleActivity(m)) {
      case 'AllPvP':
      case 'TrialsOfOsiris':
      default:
        return {
          ...genericData,
          completedFlag: '',
          values: [kills, deaths, assists, kdr],
        }
      case 'Gambit':
        return {
          ...genericData,
          completedFlag: '',
          values: [
            kills,
            guardianKills,
            deaths,
            guardianDeaths,
            motesDeposited,
            motesLost,
            motesDenied,
            primevalDamage,
          ],
        }
      case 'Nightfall':
        return {
          ...genericData,
          completedFlag: '',
          values: [kills, deaths, assists, score],
        }
      case 'Raid':
        return {
          ...genericData,
          completedFlag: completed,
          values: [kills, deaths, kdr, weaponKillsSuper, activityDurationSeconds],
        }
    }
  }

  return returnActivityData(mode)
}

export const pgcrSplashCategories = {
  Raid: ['K', 'D', 'K/D R', 'Super Kills', 'Duration'],
  Gambit: ['K', 'G. K', 'D', 'G. D', 'MB', 'ML', 'MD', 'Dam'],
  AllPvP: ['K', 'D', 'A', ' K/D R'],
  Nightfall: ['K', 'D', 'A', 'Score'],
  TrialsOfOsiris: ['K', 'D', 'A', ' K/D R'],
}
