/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
/* eslint-disable semi */
/* eslint-disable no-else-return */
import React from 'react';
import {
  VictoryChart,
  VictoryVoronoiContainer,
  VictoryLine,
  VictoryTooltip,
  VictoryAxis,
} from 'victory';

class PvPChart extends React.Component {
  render() {
    console.log('Render')
    console.log(this.props.data)
    return (
      <VictoryChart height={400} width={400}
        domainPadding={{ y: 10 }}
        containerComponent={
          <VictoryVoronoiContainer
            voronoiDimension="x"
            labels={({ datum }) => `Kills: ${datum.kills}\nDeaths: ${datum.deaths}\nAssists: ${datum.assists}\nKDR: ${datum.y}`}
            labelComponent={
              <VictoryTooltip
                cornerRadius={0}
                flyoutStyle={{ fill: 'white' }}
              />}
          />}
      >
        <VictoryAxis />
        <VictoryAxis dependentAxis />
        <VictoryLine
          data = {this.props.data}

          style={{
            data: {
              stroke: 'tomato',
              strokeWidth: ({ active }) => active ? 4 : 2,
            },
            labels: { fill: 'tomato' },
          }}
        />
      </VictoryChart>
    );
  }
}

export default PvPChart
