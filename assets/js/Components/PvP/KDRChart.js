/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
/* eslint-disable semi */
/* eslint-disable no-else-return */
import React from 'react'
import {
  VictoryChart,
  VictoryVoronoiContainer,
  VictoryLine,
  VictoryTooltip,
  VictoryAxis,
} from 'victory'

function ChartBody(props) {
  return (
    <div className="float-below-content">
      <h1>{props.title}</h1>
      <p>To improve these numbers - get good.</p>
    </div>
  )
}

class PvPChart extends React.Component {
  render() {
    console.log('Render PvPChart')
    console.log(this.props)
    return (
      <div className='chart chart-wrap'>
        <h2>K/D R data:</h2>

          <div className='chart kdr-chart'>
            <VictoryChart
              height={300}
              width={300}
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
                      orientation='right'
                    />
                  }
                />
              }
            >
              <VictoryAxis />
              <VictoryAxis dependentAxis />
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
            </VictoryChart>
          </div>
          <ChartBody title={this.props.title} />
      </div>
    )
  }
}

export default PvPChart
