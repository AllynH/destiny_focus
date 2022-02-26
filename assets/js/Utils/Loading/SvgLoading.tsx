import React from 'react'

import EarthWorm from '../../../img/icons/Expansions/Witch_Queen/EarthWorm.svg'
import MercurySulphur from '../../../img/icons/Expansions/Witch_Queen/MercurySulphur.svg'
import MoonPlatinum from '../../../img/icons/Expansions/Witch_Queen/MoonPlatinum.svg'
import SaturnLead from '../../../img/icons/Expansions/Witch_Queen/SaturnLead.svg'
import SunGold from '../../../img/icons/Expansions/Witch_Queen/SunGold.svg'
import VenusCopper from '../../../img/icons/Expansions/Witch_Queen/VenusCopper.svg'

import './svg_style.css'

export default function SvgLoading() {

  const svgStyle = {
    fill: 'var(--witch-queen-green)',
    // fill:'url(#linear-gradient)',
    zIndex: 1,
    filter: 'drop-shadow( 3px 3px 2px rgba(0, 0, 0, .3))',
  }
  const iconHeight = 64
  const iconWidth = 64

  return(
    <ul className='svg-group-wrapper list-style-none'>
      <li className='svg-group-item'><EarthWorm width={iconWidth} height={iconHeight} viewBox={'0 0 8.4 8.4'} style={svgStyle} /></li>
      <li className='svg-group-item'><MoonPlatinum width={iconWidth} height={iconHeight} viewBox={'0 0 8.4 8.4'} style={svgStyle} /></li>
      <li className='svg-group-item'><MercurySulphur width={iconWidth} height={iconHeight} viewBox={'0 0 8.4 8.4'} style={svgStyle} /></li>
      <li className='svg-group-item'><SaturnLead width={iconWidth} height={iconHeight} viewBox={'0 0 8.4 8.4'} style={svgStyle} /></li>
      <li className='svg-group-item'><SunGold width={iconWidth} height={iconHeight} viewBox={'0 0 8.4 8.4'} style={svgStyle} /></li>
      <li className='svg-group-item'><VenusCopper width={iconWidth} height={iconHeight} viewBox={'0 0 8.4 8.4'} style={svgStyle} /></li>
    </ul>

  )
}
