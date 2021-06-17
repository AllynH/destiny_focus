import React from 'react'

import { getUrlDetails } from '../../Utils/HelperFunctions'
import SelectActivityIcon from '../PGCR_Splash/SelectActivityIcon'

const getFullName = (gameMode) => {
  switch (gameMode) {
    default:
    case 'gambit':
    case 'raid':
    case 'dungeon':
    case 'nightfall': {
      return gameMode.charAt(0).toUpperCase() + gameMode.slice(1)
    }
    case 'pvp': {
      return 'All PvP'
    }
    case 'ironbanner': {
      return 'IronBanner'
    }
    case 'trials': {
      return 'TrialsOfOsiris'
    }
  }
}

export default function FocusChoiceHeader() {
  const { gameMode } = getUrlDetails()
  // const { gameMode } = props
  const fullGameModeName = getFullName(gameMode)

  return (
    <div className='focus-header-gamemode-wrapper'>
      <div className='position-absolute z-index-minus-1 opacity-50'>
        <SelectActivityIcon activityMode={fullGameModeName} />
      </div>
      <div className='focus-header-gamemode'>
        <h1 className='focus-header-gamemode-heading'>{fullGameModeName}</h1>
      </div>
    </div>
  )
}
