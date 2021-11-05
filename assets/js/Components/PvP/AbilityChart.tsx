/* eslint-disable max-len */
import React from 'react'

import AbilitiesPie from './AbilitiesPie'

import Melee from '../../../destiny-icons/weapons/melee.svg'
import Grenade from '../../../destiny-icons/weapons/grenade.svg'
import Weapons from '../../../destiny-icons/weapons/hand_cannon.svg'
import Abilities from '../../../destiny-icons/weapons/arc_drone.svg'
import Super from '../../../destiny-icons/supers/arc_titan.svg'

import './style.css'
import { AbilityDataInterface } from '../../Utils/HelperFunctions/KdrFunctions'

interface AbilitiesChartPropsInterface {
  chartData: AbilityDataInterface,
}

export default function AbilitiesChart(props: AbilitiesChartPropsInterface) {
  const { chartData } = props

  return (
    <>
      <div className='ability-chart-wrap flex-direction'>
        <div className='ability-chart-description'>
        <h3 className='sub-heading'>Avg. kills per game.</h3>
          <ul className='ability-list'>
            <li className='ability-list-li'><div className='icon weapon_icon'><Grenade width={32} /></div><div className='ability-detail-title'>GRENADE: </div><div className='ability-detail-value'>{chartData.grenades}</div></li>
            <li className='ability-list-li'><div className='icon weapon_icon'><Super width={32} viewBox={'0 -10 50 50'} /></div><div className='ability-detail-title'>SUPER: </div><div className='ability-detail-value'>{chartData.supers}</div></li>
            <li className='ability-list-li'><div className='icon weapon_icon'><Melee width={32} viewBox={'0 0 32 32'} /></div><div className='ability-detail-title'>MELEE: </div><div className='ability-detail-value'>{chartData.melee}</div></li>
            <li className='ability-list-li'><div className='icon weapon_icon'><Abilities width={32} viewBox={'0 0 32 32'} /></div><div className='ability-detail-title'>Abilities: </div><div className='ability-detail-value'>{chartData.abilities}</div></li>
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
