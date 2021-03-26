/* eslint-disable linebreak-style */

export function calculateKillDeathRatio(k, d) {
  const kills = parseFloat(k)
  const deaths = parseFloat(d)
  if (deaths === 0) {
    return (kills).toFixed(2)
  }
  return (kills / deaths).toFixed(2)
}

export function calculateKillDeathAssistsRatio(k, d, a) {
  const kills = parseFloat(k)
  const deaths = parseFloat(d)
  const assists = parseFloat(a)
  if (deaths === 0) {
    return (kills + assists).toFixed(2)
  }
  return ((kills + assists) / deaths).toFixed(2)
}

export const getKdrAverage = (data) => {
  // return a KD/R value and game count, based on the last n games.
  // Data is usually 30 games but some unfinished games are removed.
  //
  // data = [
  // {
  //   "x": 1,
  //   "y": 0.63,
  //   "deaths": "8",
  //   "kills": "5",
  //   "assists": "2"
  // },
  // :
  // :
  // ]


  let kills = 0
  let deaths = 0
  let count = 0

  data.map((d, index) => {
    kills += Number(d.kills)
    deaths += Number(d.deaths)
    count += 1
  })

  const kdr = parseFloat(kills / deaths)

  return [kdr, count]
}

export const projectKdrAverage = (data, offsetKills = 0, offsetDeaths = 0) => {
  // Project what a users KD/R would look like if the increased kills / decreased deaths:
  // data = [
  // {
  //   "x": 1,
  //   "y": 0.63,
  //   "deaths": "8",
  //   "kills": "5",
  //   "assists": "2"
  // },
  // :
  // :
  // ]

  let kills = 0
  let deaths = 0
  let count = 0

  data.map((d, index) => {
    kills += Number(d.kills) + Number(offsetKills)
    deaths += Number(d.deaths) - Number(offsetDeaths)
    count += 1
  })

  const kdr = parseFloat(kills / deaths)

  return parseFloat(kdr).toFixed(2)
}

export const AvgWeaponAbilityKills = (pgcrSummary) => {
  // This is used to populate the chart data for the AbilityChart component
  // Takes data from the last 10 PGCR's.
  // Returns an average of the kills for each type:
  //    Grenade, Super, Melee, Weapon.
  //    Ability kills are so infrequent they've been removed.

  let grenades = 0
  let ability = 0
  let supers = 0
  let melee = 0
  let weapons = 0

  pgcrSummary.Response.map((p, index) => {
    grenades += p.data.extended.values.weaponKillsGrenade.basic.value
    ability += p.data.extended.values.weaponKillsAbility.basic.value
    supers += p.data.extended.values.weaponKillsSuper.basic.value
    melee += p.data.extended.values.weaponKillsGrenade.basic.value
    weapons += p.data.values.kills.basic.value
    // count += 1
  })
  const data = {
    grenades,
    ability,
    supers,
    melee,
    weapons,
    // count,
  }
  // console.log('AbilityChart')
  // console.log(data)

  const avg = {
    weapons: data.weapons > 0 ? data.weapons / 10 : 0,
    grenades: data.grenades > 0 ? data.grenades / 10 : 0,
    // abilities: data.abilities > 0 ? data.abilities / 10 : 0,
    supers: data.supers > 0 ? data.supers / 10 : 0,
    melee: data.melee > 0 ? data.melee / 10 : 0,
  }
  return avg
}

export const getPercentage = (num, denom) => {
  return ((num / denom) * 100)
}


export const parsePrecisionData = (props) => {
  const data = []
  props.Response.map((p, index) => {
    data.push({ x: index + 1, y: parseInt(p.precisionKills, 10) })
  })
  return data
}

export const getPrecisionAverage = (data) => {
  const avg = []
  data.map((d) => {
    avg.push(d.y)
  })

  const sum = avg.reduce((a, b) => a + b, 0)
  const average = sum / avg.length || 0
  return average
}
