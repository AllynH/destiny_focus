import React from 'react'
import { VictoryChart, VictoryAxis, VictoryBar, VictoryStack, VictoryLine } from 'victory'
import ChartLegend from '../ChartHelpers/ChartLegend'
import axisStyle from './StyleConsts'

interface SmallChartInterface {
  chartTitle: string
  chartData: number[]
  average: number
  goal?: number
}

export default function LargeBarChart(props: SmallChartInterface) {
  const { chartTitle, chartData, average, goal } = props
  const checkForError = chartData.some((items) => items === undefined)
  const axisTicks = Array.from({ length: chartData.length }, (_, i) => i + 1)

  const Summary = (dType: string, avg: number, gl: number) => (
    <div className='weapon-precision-wrapper'>
      <p>Average {dType} per game:</p>
      <div className='focus-kdr-grid'>
        <span className='ability-detail-title'>Avg.: </span>
        <span className='ability-detail-value'>{avg.toFixed(1)}</span>
      </div>

      {gl ? (
        <div className='focus-kdr-grid'>
          <span className='ability-detail-title'>Goal: </span>
          <span className='ability-detail-value'>{gl}</span>
        </div>
      ) : (
        ''
      )}
    </div>
  )

  return (
    <div className='chart-focus-row-wrapper'>
      <h3 className='heading-capitalize'>{chartTitle}:</h3>
      {checkForError ? (
        <div>
          <p>There was an error in that data, try again...</p>
          <p>This chart displays raw API data, sometimes the data Bungie returns is just dummy data.</p>
        </div>
      ) : (
        <div className='chart kdr-chart'>
          <ChartLegend />
          <VictoryChart height={300} width={450} domainPadding={{ x: 30, y: 20 }}>
            <VictoryStack colorScale={['var(--vanguard-blue)', 'var(--crucible-red)']} xOffset={1}>
              <VictoryBar data={chartData} />
            </VictoryStack>

            <VictoryAxis style={axisStyle} label={'Kills'} dependentAxis />
            <VictoryAxis style={axisStyle} label={'Games (left is newer)'} tickValues={axisTicks} />
            <VictoryLine
              name='Average'
              style={{
                data: { stroke: 'var(--vanguard-blue)', opacity: 1 },
              }}
              data={[
                { x: 0, y: Number(average.toFixed(2)) },
                { x: 10, y: Number(average.toFixed(2)) },
              ]}
            />
          </VictoryChart>
        </div>
      )}
      {Summary(chartTitle, average, goal)}
    </div>
  )
}
