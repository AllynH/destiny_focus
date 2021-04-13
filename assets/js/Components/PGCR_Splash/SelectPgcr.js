import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'

import { GetPGCRUnauth, GetActivityDefinitionUnauth } from '../../Utils/API/API_Requests'
import { calculateKillDeathRatio, calculateKillDeathAssistsRatio } from '../../Utils/HelperFunctions/KdrFunctions'
import { getDatePlayedFromTimestamp } from '../../Utils/HelperFunctions/getDateTime'
import { BASIC_ACTIVITY_MODES } from '../../Data/destinyEnums'
import RaidSplash from './RaidSplash'
import PvpSplash from './PvpSplash'

import './style.css'

export default function SelectPgcr(props) {
  const [pgcr, setPgcr] = useState()
  const [modeIsRaid, setModeIsRaid] = useState()
  const [activityDef, setActivityDef] = useState()
  const [referenceDef, setReferenceDef] = useState()

  const params = useParams()
  const currRef = useRef(null)
  const { pathname } = props.location?.state || ''
  console.log('Return address:', pathname)

  const { activityId } = params

  // const activityId = 7897012836

  // Fetch the Activity definition - Map icon, name :
  useEffect(() => {
    const fetchPgcr = async (activityId) => {
      const result = await GetPGCRUnauth({
        params: {
          activityId,
        },
      })
      const activityDefinitionResult = await GetActivityDefinitionUnauth({
        params: {
          definition: 'DestinyActivityDefinition',
          defHash: result.Response.activityDetails.directorActivityHash,
        },
      })
      const activityReferenceId = await GetActivityDefinitionUnauth({
        params: {
          definition: 'DestinyActivityDefinition',
          defHash: result.Response.activityDetails.referenceId,
        },
      })
      setPgcr(result)
      setModeIsRaid(result.Response?.activityDetails?.mode === 4)
      setActivityDef(activityDefinitionResult)
      setReferenceDef(activityReferenceId)
    }
    fetchPgcr(activityId)
  }, [props])

  const returnActivityMode = () => {
    console.log(BASIC_ACTIVITY_MODES[pgcr.Response?.activityDetails?.mode])
    console.log(pgcr.Response?.activityDetails?.mode)
    return BASIC_ACTIVITY_MODES[pgcr.Response?.activityDetails?.mode]
  }

  const RenderPgcr = () => {
    console.log('Activity:', returnActivityMode())
    const activityMode = returnActivityMode()
    switch (activityMode) {
      case 'Raid':
      case 'Nightfall':
        return <RaidSplash pgcr={pgcr} activityDef={activityDef} referenceDef={referenceDef} modeIsRaid={modeIsRaid} activityMode={activityMode} />
      case 'AllPvP':
      case 'Gambit':
        return <PvpSplash pgcr={pgcr} activityDef={activityDef} referenceDef={referenceDef} modeIsRaid={modeIsRaid} activityMode={activityMode} />
      default:
        return <PvpSplash pgcr={pgcr} activityDef={activityDef} referenceDef={referenceDef} modeIsRaid={modeIsRaid} activityMode={activityMode} />
    }
  }

  return (
    <>
      {referenceDef && activityDef && <RenderPgcr /> }
    </>
  )
}
