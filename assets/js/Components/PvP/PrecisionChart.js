/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
/* eslint-disable semi */
/* eslint-disable no-else-return */
import React from 'react'
import { useSelector } from 'react-redux'

import {
  VictoryChart, VictoryBar, VictoryTheme, VictoryLine,
} from 'victory'
import './style.css'


export default function PrecisionChart(props) {
  const getFocus = useSelector((state) => state.focus)
  console.log('getFocus')
  console.log(getFocus)

  var goal = 5
  if (props.chartName === 'averageLifeTime') {
    var goal = 100
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

  return (
    <>
      <div className='chart precision-chart'>
        <VictoryChart /*theme={VictoryTheme.material}*/ domainPadding={10} height={200} width={200}>
          <VictoryBar style={{ data: { fill: '#c43a31' } }} data={parseData(props)} />
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
        </VictoryChart>
      </div>
    </>
  )
}
