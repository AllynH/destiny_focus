/* eslint-disable no-unused-expressions */
/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
/* eslint-disable semi */
/* eslint-disable no-else-return */
import React from 'react'
import { useSelector } from 'react-redux'

import {
  VictoryChart,
  VictoryBar,
  VictoryStack,
  VictoryAxis, // VictoryTheme, VictoryLine,
} from 'victory'
import './style.css'

export default function PrecisionWeaponChart(props) {
  //   const getFocus = useSelector((state) => state.focus)
  //   console.log('getFocus')
  //   console.log(getFocus)
  //   console.log('PrecisionChart')
  //   console.log(props)

  //   if (props.chartName === 'averageLifeTime') {
  //     var dataType = 'life time (seconds)'
  //     var goal = 100
  //   } else {
  //     var dataType = 'precision kills'
  //     var goal = 5
  //   }

  const parseData = (props) => {
    console.log(props)
    const dataPre = []
    const dataKills = []

    // props.Response.map((entity, pgcrIndex) => {
    //   entity.data.extended.weapons.map((game) => {
    //     try {
    //       if (game.definition.displayProperties.name === props.weaponName) {
    //         dataPre.push({
    //           x: pgcrIndex + 1,
    //           y: game.values.uniqueWeaponPrecisionKills.basic.value,
    //         })
    //       }
    //     } catch {
    //       if (game.definition.displayProperties.name === props.weaponName) {
    //         console.log('caught a precision value!!!')
    //         dataPre.push({
    //           x: pgcrIndex + 1,
    //           y: 0,
    //         })
    //       }
    //     }
    //   })
    // })

    props.Response.map((entity, pgcrIndex) => {
      let flag = false
      if (!('weapons' in entity.data.extended)) {
        console.log('Didnt find weapons  key!')
        dataPre.push({
          x: pgcrIndex + 1,
          y: 666,
        })
      }
      entity.data.extended.weapons.map((game) => {
        // try {
        if (game.definition.displayProperties.name === props.weaponName) {
          dataPre.push({
            x: pgcrIndex + 1,
            y: game.values.uniqueWeaponPrecisionKills.basic.value,
          })
          flag = true
        }
      })
    })

    props.Response.map((entity, pgcrIndex) => {
      let flag = false
      if (!('weapons' in entity.data.extended)) {
        console.log('Didnt find weapons  key!')
        dataKills.push({
          x: pgcrIndex + 1,
          y: 666,
        })
      }
      entity.data.extended.weapons.map((game) => {
        // try {
        if (game.definition.displayProperties.name === props.weaponName) {
          dataKills.push({
            x: pgcrIndex + 1,
            y: game.values.uniqueWeaponKills.basic.value,
          })
          flag = true
        }
        // } catch {
        //   console.log('caught a kill value!!!')
        //   dataKills.push({
        //     x: pgcrIndex + 1,
        //     y: 0,
        //   })
        // }
      })
    })

    const outterArray = []
    outterArray.push(dataPre)
    outterArray.push(dataKills)
    console.log('data')
    console.log(dataPre)
    console.log(dataKills)
    console.log('outterArray')
    console.log(outterArray)
    return outterArray
  }

  //   const getAverage = (data) => {
  //     const avg = []
  //     data.map((d, index) => {
  //       avg.push(d.y)
  //     })

  //     const sum = avg.reduce((a, b) => a + b, 0)
  //     const average = sum / avg.length || 0
  //     return average
  //   }

  console.log('PrecisionWeaponChart')
  console.log(props)
  console.log(props.weaponName)
  const WeaponData = parseData(props)
  console.log('WeaponData')
  console.log(WeaponData)

  //   const Summary = (dataType, average, goal) => (
  //     <div className={'precision-chart-summary'}>
  //       <p>
  //         Avg. {dataType} / game: {average}
  //       </p>
  //       <p>
  //         Goal {dataType} / game: {goal}
  //       </p>
  //     </div>
  //   )

  return (
    <>
      <div className='chart kdr-chart'>
        <h2>{props.weaponName || ''}</h2>
        <VictoryChart height={400} width={400} domainPadding={{ x: 30, y: 20 }}>
          <VictoryStack colorScale={['blue', 'tomato']}>
            {WeaponData.map((d, i) => (
              <VictoryBar data={d} key={i} />
            ))}
          </VictoryStack>
          <VictoryAxis tickFormat={(x) => x} label={'Kills'} dependentAxis />
          <VictoryAxis tickFormat={(y) => parseInt(y)} label={'Games (left is newer)'} />
        </VictoryChart>
        <p>{props.weaponName}</p>
      </div>
    </>
  )
}
