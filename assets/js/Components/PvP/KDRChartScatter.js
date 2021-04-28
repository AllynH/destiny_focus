/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
/* eslint-disable semi */
/* eslint-disable no-else-return */
import React from 'react'

import {
  VictoryAxis,
  VictoryChart,
  VictoryGroup,
  VictoryVoronoiContainer,
  VictoryLine,
  VictoryTooltip,
  VictoryScatter,
} from 'victory'

import { getKdrAverage } from '../../Utils/HelperFunctions/KdrFunctions'
import ChartLegend from '../ChartHelpers/ChartLegend'
import DisplayKdrFocus from '../Focus/DisplayFocus'

function ChartBody(props) {
  return (
    <div className='float-below-content'>
      <h1>{props.title}</h1>
      <p>To improve these numbers - get good.</p>
    </div>
  )
}

class PvPChart extends React.Component {
  getAverage = (data) => {
    const avg = []
    data.map((d, index) => {
      avg.push(d.y)
    })

    const sum = avg.reduce((a, b) => a + b, 0)
    const average = sum / avg.length || 0
    return [average, avg.length]
  }

  render() {
    const { focusReducer } = this.props
    focusReducer.payload ? console.log('Using focus goals') : console.log('Using default goals')
    const kdrGoal = focusReducer.payload ? parseFloat(focusReducer.payload.killDeathRatio) : 1.2
    const [average, arrLength] = getKdrAverage(this.props.data)
    console.log('Render PvPChart')
    console.log(this.props)
    console.log('kdrGoal', kdrGoal)
    console.log('average', average)
    console.log(arrLength)
    console.log(this.props.data)

    return (
      <>
        <div className='chart kdr-chart big-chart'>
          <ChartLegend />
          <div>
            <VictoryChart
              // height={400}
              // width={400}
              containerComponent={<VictoryVoronoiContainer />}
            >
              <VictoryGroup
                // labels={({ datum }) => `K/D R: ${datum.y}`}
                labels={({ datum }) =>
                  `Kills: ${datum.kills}\nDeaths: ${datum.deaths}\nAssists: ${datum.assists}\nKDR: ${datum.y}`
                }
                labelComponent={<VictoryTooltip style={{ fontSize: 14 }} />}
                data={this.props.data}
              >
                <VictoryLine
                  style={{
                    data: {
                      stroke: 'var(--crucible-red)',
                      strokeWidth: ({ active }) => (active ? 3 : 2),
                    },
                    labels: { fill: 'tomato' },
                  }}
                />
                <VictoryScatter size={({ active }) => (active ? 5 : 3)} />
              </VictoryGroup>
              <VictoryAxis label='Games (left is newer)' />
              <VictoryAxis label='K/D R' dependentAxis />
              <VictoryLine
                style={{
                  data: { stroke: 'var(--gambit-green)', opacity: 0.7 },
                }}
                data={[
                  { x: 1, y: kdrGoal },
                  { x: arrLength + 1, y: kdrGoal },
                ]}
              />
              {/* Add a  KDR avg line: */}
              <VictoryLine
                style={{
                  data: { stroke: 'var(--vanguard-blue)', opacity: 0.7 },
                }}
                data={[
                  { x: 1, y: average },
                  { x: arrLength + 1, y: average },
                ]}
              />
            </VictoryChart>
          </div>
        </div>

        <DisplayKdrFocus avgKdr={average} focusReducer={focusReducer} {...this.props} />
      </>
    )
  }
}

export default PvPChart
