/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
/* eslint-disable semi */
/* eslint-disable no-else-return */
import React from 'react'
import { useSelector } from 'react-redux'

import {
  VictoryAxis, VictoryChart, VictoryBar, VictoryTheme, VictoryLine,
} from 'victory'

import ChartLegend from '../ChartHelpers/ChartLegend'

import './style.css'

export default function PrecisionChart(props) {
  const getFocus = useSelector((state) => state.focus)
  // console.log('getFocus')
  // console.log(getFocus)
  // console.log('PrecisionChart')
  // console.log(props)

  const { focusReducer } = props
  // focusReducer?.payload
  //   ? console.log('PrecisionChart using focus goals')
  //   : console.log('PrecisionChart using default goals')
  // const kdrGoal = focusReducer?.payload ? parseFloat(focusReducer.payload.killDeathRatio) : 1.2
  const axisStyle = {
    background: {
      fill: 'var(--vanguard-dark-5)',
    },
    tickLabels: {
      fill: 'white',
    },
    axis: {
      stroke: 'white',
    },
    axisLabel: {
      fill: 'white',
    },
    labels: {
      fill: 'white',
    },
    data: {
      fill: '#c43a31',
    },
  }

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
    const average = sum / avg.length || 0
    return average
  }

  const chartData = parseData(props)
  const average = getAverage(chartData)
  // console.log('average')
  // console.log(average)

  const Summary = (dataType, average, goal) => (
    <div className='weapon-precision-wrapper'>
      <p>Average {dataType} per game:</p>
      <div className='focus-kdr-grid'>
        <span className='ability-detail-title'>Avg.: </span>
        <span className='ability-detail-value'>{average.toFixed(1)}</span>
      </div>

      <div className='focus-kdr-grid'>
        <span className='ability-detail-title'>Goal: </span>
        <span className='ability-detail-value'>{goal}</span>
      </div>
    </div>
  )

  console.log('axisStyle')
  console.log(axisStyle)

  return (
    <div className='summary-chart-wrapper'>
      <h3 className='heading-capitalize'>{dataType}:</h3>
      <div className='chart precision-chart'>
        <ChartLegend />
        <VictoryChart
          /* theme={VictoryTheme.material} */ domainPadding={10}
          height={230}
          width={250}
          style={axisStyle}
        >
          <VictoryAxis style={axisStyle} label='Games (left is newer)' />
          <VictoryAxis style={axisStyle} dependentAxis />
          <VictoryBar style={ { ...axisStyle }} data={chartData} />
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
          <VictoryLine
            name='Average'
            style={{
              data: { stroke: 'var(--vanguard-blue)', opacity: 1 },
            }}
            data={[
              { x: 0, y: average },
              { x: 10, y: average },
            ]}
          />
        </VictoryChart>
      </div>
      {Summary(dataType, average, goal)}
    </div>
  )
}
