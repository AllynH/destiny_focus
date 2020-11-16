/* eslint-disable no-unused-expressions */
/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
/* eslint-disable semi */
/* eslint-disable no-else-return */
import React from 'react'
import { useSelector } from 'react-redux'

import { VictoryChart, VictoryBar, VictoryStack, VictoryAxis, VictoryLine } from 'victory'
import './style.css'

export default function PrecisionWeaponChart(props) {
  const parseData = (props) => {
    console.log(props)
    const dataPre = []
    const dataKills = []
    let equipCount = 0

    props.Response.map((entity, pgcrIndex) => {
      let flag = false
      entity.data.extended.weapons.map((game, weaponIndex) => {
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
              game.values.uniqueWeaponKills.basic.value -
              game.values.uniqueWeaponPrecisionKills.basic.value,
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
    console.log('data')
    console.log(dataPre)
    console.log(dataKills)
    console.log('WeaponData')
    console.log(WeaponData)
    return { WeaponData, equipCount }
  }

  const getAverage = (data, count) => {
    console.log('data')
    console.log(data)
    console.log(data[0].total)
    console.log('END - data')
    const avg = []
    data.map((d) => avg.push(d.total || 0))
    console.log(avg)

    const sum = avg.reduce((a, b) => a + b, 0)
    const average = (sum / count || 0).toFixed(2)
    console.log(sum)
    console.log(average)
    return average
  }

  const getMax = (data, key) => {
    console.log('getMax')
    console.log(data)
    const arr = []
    data.map((d) => arr.push(d[key]) || 0)
    console.log(arr)
    const max = Math.max(...arr)
    console.log(max)
    return max
  }

  const { WeaponData, equipCount } = parseData(props)
  console.log(parseData(props))
  console.log(WeaponData)
  console.log(equipCount)
  const { weaponName } = props
  const precisionAvg = getAverage(WeaponData[0], equipCount)
  const killsAvg = getAverage(WeaponData[1], equipCount)
  const maxPrecisionKills = getMax(WeaponData[0], 'y')
  const maxKills = getMax(WeaponData[1], 'total')

  console.log(precisionAvg)
  console.log(killsAvg)

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
      <h3>Weapon stats: {weaponName || ''}</h3>
      <p>
        {weaponName}: was equied for: {equipCount} games.
      </p>
      <p>Max kills: {maxKills}</p>
      <p>Max precision kills: {maxPrecisionKills}</p>
      <p>Avg kills: {killsAvg}</p>
      <p>Avg precision kills: {precisionAvg}</p>
    </>
  )
}
