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

function ChartBody(props) {
  return (
    <div className='float-below-content'>
      <h1>{props.title}</h1>
      <p>To improve these numbers - get good.</p>
    </div>
  )
}

class PvPChart extends React.Component {
  render() {
    const kdr = 1.2
    console.log('Render PvPChart')
    console.log(this.props)
    console.log(this.state?.focusReducer)
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
                data: { fill: 'greyscale', opacity: 0.7 },
              }}
              data={[
                { x: 0, y: kdr },
                { x: 30, y: kdr },
              ]}
            />
          </VictoryChart>
        </div>
        {/* <ChartBody title={this.props.title} /> */}
      </>
    )
  }
}

export default PvPChart
