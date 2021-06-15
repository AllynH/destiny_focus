import React from 'react'

export default function ChartLegend() {
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

export function PrecisionChartLegend() {
  return (
    <div className='chart-legend-wrapper'>
      <div className='chart-legend-item'>
        <div className='chart-legend-square precision-colour'></div>
        <div className='chart-legend-text'>Precision kills</div>
      </div>
      <div className='chart-legend-item'>
        <div className='chart-legend-square bodyshot-colour'></div>
        <div className='chart-legend-text'>Bodyshot kills</div>
      </div>
    </div>
  )
}
