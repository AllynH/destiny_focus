import React from 'react'

import {
  VictoryChart, VictoryBar, VictoryStack, VictoryAxis,
} from 'victory'

import './style.css'

export default function PrecisionWeaponChart(props) {
  const parseData = () => {
    const dataPre = []
    const dataKills = []
    let equipCount = 0

    props.Response.forEach((entity, pgcrIndex) => {
      let flag = false
      entity.data.extended.weapons.forEach((game, weaponIndex) => {
        // try {
        if (game.definition.displayProperties.name === props.weaponName) {
          dataPre.push({
            type: 'precisionKills',
            x: pgcrIndex + 1,
            y: game.values.uniqueWeaponPrecisionKills.basic.value,
            total: game.values.uniqueWeaponPrecisionKills.basic.value,
          })
          dataKills.push({
            type: 'kills',
            x: pgcrIndex + 1,
            y:
              game.values.uniqueWeaponKills.basic.value
              - game.values.uniqueWeaponPrecisionKills.basic.value,
            total: game.values.uniqueWeaponKills.basic.value,
          })
          equipCount += 1
          flag = true
        }
        if (weaponIndex + 1 === entity.data.extended.weapons.length && flag === false) {
          dataPre.push({
            type: 'precisionKills',
            x: pgcrIndex + 1,
            y: 0,
            total: 0,
          })
          dataKills.push({
            type: 'kills',
            x: pgcrIndex + 1,
            y: 0,
            total: 0,
          })
          flag = true
        }
      })
    })

    const WeaponData = []
    WeaponData.push(dataPre)
    WeaponData.push(dataKills)
    return { WeaponData, equipCount }
  }

  const getAverage = (data, count) => {
    const avg = []
    data.map((d) => avg.push(d.total || 0))
    // console.log(avg)

    const sum = avg.reduce((a, b) => a + b, 0)
    const average = (sum / count || 0).toFixed(2)
    return average
  }

  const getMax = (data, key) => {
    const arr = []
    data.map((d) => arr.push(d[key]) || 0)
    const max = Math.max(...arr)
    return max
  }

  const { WeaponData, equipCount } = parseData(props)
  const { weaponName } = props
  const precisionAvg = getAverage(WeaponData[0], equipCount)
  const killsAvg = getAverage(WeaponData[1], equipCount)
  const maxPrecisionKills = getMax(WeaponData[0], 'y')
  const maxKills = getMax(WeaponData[1], 'total')

  return (
    <>
      <div className='chart kdr-chart'>
        <h2 className='h2-weapon-precision'>{weaponName || ''}</h2>
        <VictoryChart height={400} width={400} domainPadding={{ x: 30, y: 20 }}>
          <VictoryStack colorScale={['blue', 'tomato']}>
            {WeaponData.map((d, i) => (
              <VictoryBar data={d} key={i} />
            ))}
          </VictoryStack>

          {/* <VictoryLine
            style={{
              data: { fill: 'greyscale', opacity: 0.7 },
            }}
            data={[
              { x: 0, y: precisionAvg },
              { x: 10, y: precisionAvg },
            ]}
          />
          <VictoryLine
            style={{
              data: { stroke: '#32a852', opacity: 0.7 },
            }}
            data={[
              { x: 0, y: killsAvg },
              { x: 10, y: killsAvg },
            ]}
          /> */}

          <VictoryAxis label={'Kills'} dependentAxis />
          <VictoryAxis label={'Games (left is newer)'} />
        </VictoryChart>
      </div>
      <div className='weapon-precision-wrapper'>
      <h2 className='focus-heading-h2'>Weapon stats: {weaponName || ''}</h2>
      <p>
        Equiped for: {equipCount} games.
      </p>
      <div className='weapon-precision-avg-max-grid'>
        <div className='weapon-precision-avg-max-grid'><span className='ability-detail-title'>Max kills: </span><span className='ability-detail-value'>{maxKills}</span></div>
        <div className='weapon-precision-avg-max-grid'><span className='ability-detail-title'>Max precision kills: </span><span className='ability-detail-value'>{maxPrecisionKills}</span></div>
        <div className='weapon-precision-avg-max-grid'><span className='ability-detail-title'>Avg kills: </span><span className='ability-detail-value'>{killsAvg}</span></div>
        <div className='weapon-precision-avg-max-grid'><span className='ability-detail-title'>Avg precision kills: </span><span className='ability-detail-value'>{precisionAvg}</span></div>
      </div>
      </div>
    </>
  )
}
