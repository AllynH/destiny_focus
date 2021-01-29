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

  console.log('projectedKDR:')
  console.log(kills)
  console.log(deaths)
  console.log(kdr)
  console.log(offsetKills)
  console.log(offsetDeaths)
  console.log(count)
  console.log(parseFloat(kdr).toFixed(2))

  return parseFloat(kdr).toFixed(2)
}
