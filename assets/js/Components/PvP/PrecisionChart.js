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

  const { focusReducer } = props
  focusReducer?.payload ? console.log('PrecisionChart using focus goals') : console.log('PrecisionChart using default goals')
  const kdrGoal = focusReducer?.payload ? parseFloat(focusReducer.payload.killDeathRatio) : 1.2

  if (props.chartName === 'averageLifeTime') {
    var dataType = 'life time (secs)'
    var goal = focusReducer?.payload ? parseFloat(focusReducer.payload.avgLifeTime) : 100
  } else {
    var dataType = 'precision kills'
    var goal = focusReducer?.payload ? parseFloat(focusReducer.payload.precisionKillsCount) : 5
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
    const average = (sum / avg.length) || 0
    return average
  }

  const chartData = parseData(props)
  const average = getAverage(chartData)
  console.log('average')
  console.log(average)

  const Summary = (dataType, average, goal) => (
    <div className={'precision-chart-summary'}>
      <p>
        Avg.: {average.toFixed(2)}
      </p>
      <p>
        Goal: {goal}
      </p>
    </div>
  )

  return (
    <div className='summary-chart-wrapper'>
      <h3 className='heading-capitalize'>{dataType}:</h3>
      <div className='chart precision-chart'>
        <VictoryChart
          /* theme={VictoryTheme.material} */ domainPadding={10}
          height={230}
          width={250}
        >
          <VictoryBar style={{ data: { fill: '#c43a31' } }} data={chartData} />
          <VictoryLine
            name='Goal'
            style={{
              data: { stroke: 'var(--gambit-green)', opacity: 0.7 },
            }}
            data={[
              { x: 0, y: goal },
              { x: 10, y: goal },
            ]}
          />
          <VictoryLine
            name='Average'
            style={{
              data: { stroke: 'black', opacity: 0.7 },
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
