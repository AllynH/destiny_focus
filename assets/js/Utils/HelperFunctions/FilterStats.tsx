import { pgcrSummaryInterface } from "../../Components/PvP/types"

export const getStatsFromPgcrEntry = (key: string, pgcrSummary: pgcrSummaryInterface) => {
  if (key in pgcrSummary.Response[0]?.data?.values) {
    return pgcrSummary.Response.map((entry) => entry.data.values[key].basic.value)
  }
  return pgcrSummary.Response.map((entry) => entry.data.extended.values[key]?.basic.value)
}

export const getAverageFromArray = (statsArray: number[]) => {
  const count = statsArray.length
  const sum = statsArray.reduce((a, b) => a + b, 0) || 0
  const average = sum / count

  return average
}
