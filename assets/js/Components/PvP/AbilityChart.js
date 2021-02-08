/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
/* eslint-disable semi */
/* eslint-disable no-else-return */
import React from 'react'
import { useSelector } from 'react-redux'

import AbilitiesPie from './AbilitiesPie'

// import { Melee } from '../../../img/Melee.svg'
import Melee from '../../../destiny-icons/weapons/melee.svg'
import Grenade from '../../../destiny-icons/weapons/grenade.svg'
import Weapons from '../../../destiny-icons/weapons/hand_cannon.svg'
// import AutoRifle from '../../../destiny-icons/weapons/auto_rifle.svg'
import Super from '../../../destiny-icons/supers/arc_titan.svg'

import './style.css'

export default function AbilitiesChart(props) {
  const getFocus = useSelector((state) => state.focus)
  console.log('getFocus')
  console.log(getFocus)
  console.log('PrecisionChart')
  console.log(props)
  const { chartData } = props

  return (
    <>
      <div className='ability-chart-wrap'>
        <div className='ability-chart-description'>
        <p className='sub-heading'>Avg. kills per game.</p>
          <ul className='ability-list'>
            <li className='ability-list-li'><div className='icon weapon_icon'><Melee width={32} /></div><div className='ability-detail-title'>MELEE: </div><div className='ability-detail-value'>{chartData.melee}</div></li>
            <li className='ability-list-li'><div className='icon weapon_icon'><Grenade width={32} /></div><div className='ability-detail-title'>GRENADE: </div><div className='ability-detail-value'>{chartData.grenades}</div></li>
            <li className='ability-list-li'><div className='icon weapon_icon'><Super width={32} viewBox={'0 -10 50 50'} /></div><div className='ability-detail-title'>SUPER: </div><div className='ability-detail-value'>{chartData.supers}</div></li>
            <li className='ability-list-li'><div className='icon weapon_icon'><Weapons width={32} viewBox={'0 -10 50 50'} /></div><div className='ability-detail-title'>WEAPONS: </div><div className='ability-detail-value'>{chartData.weapons}</div></li>
          </ul>
        </div>
        <div className='summary-chart-wrapper wider-chart'>
          <div className='chart precision-chart'>
            {/* <PolarChart data={chartData} /> */}
            <AbilitiesPie data={chartData} />
          </div>
        </div>
      </div>
    </>
  )
}
