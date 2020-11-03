/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
/* eslint-disable semi */
/* eslint-disable no-else-return */
import React from 'react'
import { useSelector } from 'react-redux'

import { VictoryChart, VictoryBar, VictoryTheme, VictoryLine } from 'victory'
import './style.css'

export default function PrecisionChart(props) {
  const getFocus = useSelector((state) => state.focus)
  console.log('getFocus')
  console.log(getFocus)
  console.log('PrecisionChart')
  console.log(props)

  if (props.chartName === 'averageLifeTime') {
    var dataType = 'life time (seconds)'
    var goal = 100
  } else {
    var dataType = 'precision kills'
    var goal = 5
  }

  const parseData = (props) => {
    const data = []
    props.Response.map((p, index) => {
      if (props.chartName === 'averageLifeTime') {
        data.push({ x: index + 1, y: parseInt(p.averageLifeTime, 10) })
      } else {
        data.push({ x: index + 1, y: parseInt(p.precisionKills, 10) })
      }
    })
    return data
  }

  const getAverage = (data) => {
    const avg = []
    data.map((d, index) => {
      avg.push(d.y)
    })

    const sum = avg.reduce((a, b) => a + b, 0)
    const average = sum / avg.length || 0
    return average
  }

  const chartData = parseData(props)
  const average = getAverage(chartData)
  console.log('average')
  console.log(average)

  const Summary = (dataType, average, goal) => (
    <div className={'precision-chart-summary'}>
      <p>
        Avg. {dataType} / game: {average}
      </p>
      <p>
        Goal {dataType} / game: {goal}
      </p>
    </div>
  )

  return (
    <div className='summary-chart-wrapper'>
      <div className='chart precision-chart'>
        <VictoryChart
          /* theme={VictoryTheme.material} */ domainPadding={10}
          height={200}
          width={200}
        >
          <VictoryBar style={{ data: { fill: '#c43a31' } }} data={chartData} />
          <VictoryLine
            name='Goal'
            style={{
              data: { fill: 'greyscale', opacity: 0.7 },
            }}
            data={[
              { x: 0, y: goal },
              { x: 10, y: goal },
            ]}
          />
          <VictoryLine
            name='Average'
            style={{
              data: { stroke: '#32a852', opacity: 0.7 },
            }}
            data={[
              { x: 0, y: average },
              { x: 10, y: average },
            ]}
          />
        </VictoryChart>
      </div>
      {Summary (dataType, average, goal)}
    </div>
  )
}
