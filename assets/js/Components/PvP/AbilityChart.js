/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
/* eslint-disable semi */
/* eslint-disable no-else-return */
import React from 'react'
import { useSelector } from 'react-redux'

import AbilitiesPie from './AbilitiesPie'

import './style.css'

export default function AbilitiesChart(props) {
  const getFocus = useSelector((state) => state.focus)
  console.log('getFocus')
  console.log(getFocus)
  console.log('PrecisionChart')
  console.log(props)

  const parseData = (props) => {
    // const data = {}
    let grenades = 0
    let ability = 0
    let supers = 0
    let melee = 0
    let weapons = 0
    // let count = 0
    props.Response.map((p, index) => {
      grenades += p.data.extended.values.weaponKillsGrenade.basic.value
      ability += p.data.extended.values.weaponKillsAbility.basic.value
      supers += p.data.extended.values.weaponKillsSuper.basic.value
      melee += p.data.extended.values.weaponKillsGrenade.basic.value
      weapons += p.data.values.kills.basic.value
      // count += 1
    })
    const data = {
      grenades,
      ability,
      supers,
      melee,
      weapons,
      // count,
    }
    console.log('AbilityChart')
    console.log(data)

    const avg = {
      weapons: data.weapons > 0 ? data.weapons / 10 : 0,
      grenades: data.grenades > 0 ? data.grenades / 10 : 0,
      // abilities: data.abilities > 0 ? data.abilities / 10 : 0,
      supers: data.supers > 0 ? data.supers / 10 : 0,
      melee: data.melee > 0 ? data.melee / 10 : 0,
    }
    return avg
  }

  const chartData = parseData(props)

  return (
    <>
      <div className='ability-chart-wrap'>
        <div className='ability-chart-description'>
          <p>Avg. kills per game.</p>
          <ul className='ability-list'>
            <li className='ability-list-li'>Melee: {chartData.melee}</li>
            <li className='ability-list-li'>Grenade: {chartData.grenades}</li>
            <li className='ability-list-li'>Super: {chartData.supers}</li>
            <li className='ability-list-li'>Weapons: {chartData.weapons}</li>
          </ul>
        </div>
        <div className='summary-chart-wrapper'>
          <div className='chart precision-chart'>
            {/* <PolarChart data={chartData} /> */}
            <AbilitiesPie data={chartData} />
          </div>
        </div>
      </div>
    </>
  )
}
