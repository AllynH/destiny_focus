import React from 'react'

export default function ChartLegend(props) {
  return (
    <div className='chart-legend-wrapper'>
      <div className='chart-legend-item'>
        <div className='chart-legend-square focus-colour'></div>
        <div className='chart-legend-text'>Focus Goal</div>
      </div>
      <div className='chart-legend-item'>
        <div className='chart-legend-square average-colour'></div>
        <div className='chart-legend-text'>Average</div>
      </div>
    </div>
  )
}
