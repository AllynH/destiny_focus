/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
/* eslint-disable semi */
/* eslint-disable no-else-return */
import React from 'react'

import {
  VictoryChart,
  VictoryTheme,
  VictoryVoronoiContainer,
  VictoryLine,
  VictoryTooltip,
  VictoryAxis,
} from 'victory'

import DisplayKdrFocus from './DisplayFocus'

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
    return average
  }

  render() {
    const { focusReducer } = this.props
    // console.log('KDR Chart:')
    // console.log(focusReducer)
    // eslint-disable-next-line no-unused-expressions
    focusReducer.payload ? console.log('Using focus goals') : console.log('Using default goals')
    const kdrGoal = focusReducer.payload ? parseFloat(focusReducer.payload.killDeathRatio) : 1.2

    const average = this.getAverage(this.props.data)
    // console.log('Render PvPChart')
    // console.log(this.props)

    return (
      <>
        <div className='chart kdr-chart'>
          <VictoryChart
            // height={300}
            // width={300}
            // Material theme overwrites the X & Y labels:
            // theme={VictoryTheme.material}
            domainPadding={{ y: 10 }}
            containerComponent={
              <VictoryVoronoiContainer
                voronoiDimension='x'
                labels={({ datum }) =>
                  `Kills: ${datum.kills}\nDeaths: ${datum.deaths}\nAssists: ${datum.assists}\nKDR: ${datum.y}`
                }
                labelComponent={
                  <VictoryTooltip
                    constrainToVisibleArea
                    cornerRadius={0}
                    flyoutStyle={{ fill: 'white' }}
                    // orientation='right'
                  />
                }
              />
            }
          >
            <VictoryAxis label='Games (left is newer)' />
            <VictoryAxis label='K/D R' dependentAxis />
            <VictoryLine
              data={this.props.data}
              style={{
                data: {
                  stroke: 'tomato',
                  strokeWidth: ({ active }) => (active ? 4 : 2),
                },
                labels: { fill: 'tomato' },
              }}
            />

            {/* Add a  KDR goal line: */}
            <VictoryLine
              style={{
                data: { stroke: 'var(--gambit-green)', opacity: 0.7 },
              }}
              data={[
                { x: 0, y: kdrGoal },
                { x: 30, y: kdrGoal },
              ]}
            />
            {/* Add a  KDR avg line: */}
            <VictoryLine
              style={{
                data: { stroke: 'black', opacity: 0.7 },
              }}
              data={[
                { x: 0, y: average },
                { x: 30, y: average },
              ]}
            />
          </VictoryChart>
        </div>
        <DisplayKdrFocus avgKdr={average} focusReducer={focusReducer} {...this.props} />
      </>
    )
  }
}

export default PvPChart
