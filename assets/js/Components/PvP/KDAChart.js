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
    console.log(this.props.kda)
    const labels = this.props.data
    return (
      <VictoryChart height={450} width={450}
        domainPadding={{ y: 10 }}
        containerComponent={
          <VictoryVoronoiContainer
            voronoiDimension="x"
            labels={({ datum }) => `K: ${datum._kills}\nD: ${datum._deaths}\nA: ${datum._assists}\nKDA: ${datum._kdr}`}
            labelComponent={
              <VictoryTooltip
                cornerRadius={0}
                flyoutStyle={{ fill: 'white' }}
              />}
          />}
      >
        <VictoryAxis />
        <VictoryAxis dependentAxis tickFormat={(x) => x}/>
        <VictoryLine
          data = {this.props.kills} // y={this.props.data.kills} x={this.props.data.x}

          style={{
            data: {
              stroke: 'tomato',
              strokeWidth: ({ active }) => active ? 4 : 2,
            },
            labels: { fill: 'tomato' },
          }}
        />
        <VictoryLine
          data = {this.props.deaths}

          style={{
            data: {
              stroke: 'black',
              strokeWidth: ({ active }) => active ? 4 : 2,
            },
            // labels: { fill: 'black' },
          }}
        />
    </VictoryChart>
    );
  }
}

export default PvPChart
