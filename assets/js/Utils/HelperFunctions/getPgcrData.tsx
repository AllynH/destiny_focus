import { PgcrPlayerInterface } from "../../Components/PGCR/types"
import { pgcrStatType } from "../../Components/PGCR_Splash/types"
import { calculateKillDeathRatio, calculateKillDeathAssistsRatio } from "./KdrFunctions"

type dataValueInterface = {
  // eslint-disable-next-line no-unused-vars
  [_key in pgcrStatType]: number | string
}

export default function getPgcrData(props: PgcrPlayerInterface): dataValueInterface {
  const { entry } = props

  // PvP:
  const deaths = entry.values.deaths.basic.value
  const kills = entry.values.kills.basic.value
  const assists = entry.values.assists.basic.value
  const kdr = calculateKillDeathRatio(kills, deaths)
  const kda = calculateKillDeathAssistsRatio(kills, deaths, assists)

  // Raid:
  const duration = entry.values.timePlayedSeconds.basic.displayValue
  const superKills = entry.extended.values.weaponKillsSuper.basic.value
  const grenadeKills = entry.extended.values.weaponKillsGrenade.basic.value

  // Gambit:
  const motesBanked = entry.extended?.values?.motesDeposited?.basic?.value
  const motesLost = entry.extended?.values?.motesLost?.basic?.value
  const motesDenied = entry.extended?.values?.motesDenied?.basic?.value
  const motesDeposited = entry.extended?.values?.motesDeposited?.basic?.value
  const damage = entry.extended?.values?.primevalDamage?.basic?.value
  const invasionKills = entry.extended?.values?.invasionKills?.basic?.value
  const invaderKills = entry.extended?.values?.invaderKills?.basic?.value
  const guardianKills = invasionKills + invaderKills
  const invasionDeaths = entry.extended?.values?.invasionDeaths?.basic?.value
  const invaderDeaths = entry.extended?.values?.invaderDeaths?.basic?.value
  const guardianDeaths = invasionDeaths + invaderDeaths

  // NightFall:
  const score = entry.score?.basic?.value

  const data: dataValueInterface = {
    kills,
    deaths,
    assists,
    kdr,
    kda,
    guardianKills,
    guardianDeaths,
    motesLost,
    motesBanked,
    motesDenied,
    motesDeposited,
    superKills,
    duration,
    damage,
    score,
    grenadeKills,
  }
  return data
}
