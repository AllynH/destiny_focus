import React from 'react'
import {
  VictoryChart,
  VictoryAxis,
  VictoryBar,
  VictoryStack,
  VictoryLine,
  VictoryTooltip,
} from 'victory'
import ChartLegend from '../ChartHelpers/ChartLegend'
import axisStyle from './StyleConsts'

interface SmallChartInterface {
  chartTitle: string
  chartData: number[]
  average: number
  goal?: number
}

export default function SmallBarChart(props: SmallChartInterface) {
  const { chartTitle, chartData, average, goal } = props
  const checkForError = chartData.some((items) => items === undefined)
  const axisTicks = Array.from({ length: chartData.length }, (_, i) => i + 1)

  /*
    Manually set the x: min & max, and y: min & max values.
    This is to prevent display issues where some charts contain all zeros.
  */
  const checkForAllZero = chartData.every((items) => items === 0)
  const maxY = checkForAllZero ? 1 : chartData.reduce((a, b) => Math.max(a, b))
  const lowestY = chartData.reduce((a, b) => Math.min(a, b))
  const minY = lowestY > 0 ? 0 : lowestY
  const dataSetLength = chartData.length

  const dataObject = chartData.map((y, index) => ({x: index, y}))

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
    <div className='summary-chart-wrapper'>
      <h3 className='heading-capitalize'>{chartTitle}:</h3>
      {checkForError ? (
        <div>
          <p>There was an error in that data, try again...</p>
          <p>This chart displays raw API data, sometimes the data Bungie returns is just dummy data.</p>
        </div>
      ) : (
        <div className='chart precision-chart'>
          <ChartLegend />
          <VictoryChart
            height={230}
            width={250}
            domainPadding={10}
            style={axisStyle}
            domain={{ x: [0, dataSetLength], y: [minY, maxY] }}
          >
            <VictoryAxis style={axisStyle} label={'Games (left is newer)'} tickValues={axisTicks} />
            <VictoryAxis style={axisStyle} dependentAxis />

            <VictoryStack colorScale={['var(--vanguard-blue)', 'var(--crucible-red)']} xOffset={1}>
            <VictoryBar
                data={dataObject}
                labels={({ datum }) => datum.y}
                labelComponent={
                  <VictoryTooltip
                    // flyoutStyle={{ stroke: 'tomato', strokeWidth: 2 }}
                  />
                }
              />
            </VictoryStack>

            {goal && (
              <VictoryLine
                name='Goal'
                style={{
                  ...axisStyle,
                  data: { stroke: 'var(--bungie-power)', opacity: 1 },
                }}
                data={[
                  { x: 0, y: goal },
                  { x: 10, y: goal },
                ]}
              />
            )}
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
