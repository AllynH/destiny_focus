import React from 'react'

import { getUrlDetails } from '../../Utils/HelperFunctions'
import { FOCUS_DETAILS } from '../Focus/FocusDetails'
import { FocusDetailKey } from '../Focus/types'
import SelectActivityIcon from '../PGCR_Splash/SelectActivityIcon'

export default function FocusChoiceHeader() {
  const { gameMode } = getUrlDetails()

    // Cast to an Array of FocusDetailKeys[] as .filter returns an array - hopefully with only 1 item filteredActivityKeys[0]
    const filteredActivityKeys: FocusDetailKey[]
      = Object.keys(FOCUS_DETAILS)
      .filter((key: FocusDetailKey) => FOCUS_DETAILS[key].focus === gameMode) as FocusDetailKey[]

    const { activityName, focus } = FOCUS_DETAILS[filteredActivityKeys[0]]

  return (
    <div className='focus-header-gamemode-wrapper'>
      <div className='position-absolute z-index-minus-1 opacity-50'>
        <SelectActivityIcon activityMode={focus} iconStyle={'largeIconPgcr'} />
      </div>
      <div className='focus-header-gamemode'>
        <h1 className='focus-header-gamemode-heading'>{activityName}</h1>
      </div>
    </div>
  )
}
