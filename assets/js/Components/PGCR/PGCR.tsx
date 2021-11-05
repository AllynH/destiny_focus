import React, { useState } from 'react'

// import CheckIcon from '@material-ui/icons/Check'
// import HighlightOffIcon from '@material-ui/icons/HighlightOff'
// import { makeStyles } from '@material-ui/core/styles'

import { DestinyHistoricalStatsPeriodGroup } from 'bungie-api-ts/destiny2'
import { getUrlDetails } from '../../Utils/HelperFunctions'

import { BASIC_ACTIVITY_MODES, PgcrTypes } from '../../Data/destinyEnums'

import Activity from './Activity'
import { GetPGCR } from '../../Utils/API/API_Requests'
import './style.css'
import { FocusGoalTypes } from '../Focus/types'
import { CreateTeams, PgcrHeader } from './PgcrPreview'


interface PgcrPropsInterface {
  historicalStatsGroup: DestinyHistoricalStatsPeriodGroup
  favourite?: boolean
}

export default function Pgcr(props: PgcrPropsInterface) {
  const { historicalStatsGroup } = props
  const { instanceId } = props.historicalStatsGroup.activityDetails
  const [pgcr, setPgcr] = useState(null)
  const [activityMode, setActivityMode] = useState<PgcrTypes>('AllPvP')
  const [isExpanded, setIsExpanded] = useState(false)

  const { gameMode } = getUrlDetails()
  const currentGameMode = gameMode as FocusGoalTypes

  const fetchPgcr = async (activityId: string) => {
    const result = await GetPGCR({ params: { activityId } })
    setPgcr(result)
    setActivityMode(BASIC_ACTIVITY_MODES[result?.Response?.activityDetails?.mode] as PgcrTypes)
  }

  const handleClick = (id: string) => {
    // Prevent reloads from multiple clicks:
    if (!isExpanded) {
      // console.log('Clicked', instanceId)
      fetchPgcr(id)
      setIsExpanded(true)
    }
  }

  return (
    <>
      <div className='pgcr-wrapper'>
        <ul
          className='pgcr pgcr-pointer list-style-none'
          role='button'
          onClick={() => {
            handleClick(instanceId)
          }}
        >
          <Activity
            historicalStatsGroup={historicalStatsGroup}
            activityMode={activityMode}
            isExpanded={isExpanded}
            currentGameMode={currentGameMode}
          />
          {pgcr &&
          <>
            <PgcrHeader activityMode={activityMode} />
            <CreateTeams entriesList={pgcr.Response.entries} activityMode={activityMode} />
          </>
          }
        </ul>
      </div>
    </>
  )
}
