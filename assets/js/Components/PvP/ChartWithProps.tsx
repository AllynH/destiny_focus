import React from 'react'

import LargeBarChart from '../Charts/LargeBarChart'
import SmallBarChart from '../Charts/SmallBarChart'

import './style.css'

type chartType = 'large' | 'small'

interface ChartWithPropsInterface {
  statName: string
  statValues: number[]
  average: number
  size?: chartType
}
export default function ChartWithProps(props: ChartWithPropsInterface) {
  const { statName, statValues, average, size } = props
  const chartData = statValues
  const smallChart = size === 'small'

  return (
    <>
      {smallChart ? (
        <SmallBarChart chartTitle={statName} chartData={chartData} average={average} />
      ) : (
        <LargeBarChart chartTitle={statName} chartData={chartData} average={average} />
      )}
    </>
  )
}
