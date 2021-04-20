import React, { useState, useEffect, useRef } from 'react'
import { useParams, useLocation } from 'react-router-dom'

import { GetPGCRUnauth, GetActivityDefinitionUnauth } from '../../Utils/API/API_Requests'
import {
  calculateKillDeathRatio,
  calculateKillDeathAssistsRatio,
} from '../../Utils/HelperFunctions/KdrFunctions'
import { getDatePlayedFromTimestamp } from '../../Utils/HelperFunctions/getDateTime'
import { BASIC_ACTIVITY_MODES } from '../../Data/destinyEnums'
import RaidSplash from './RaidSplash'
import PvpSplash from './PvpSplash'

import './style.css'

export default function SelectPgcr(props) {
  const [selectedCharacter, setSelectedCharacter] = useState(null)
  const [pgcr, setPgcr] = useState()
  const [modeIsRaid, setModeIsRaid] = useState()
  const [activityDef, setActivityDef] = useState()
  const [referenceDef, setReferenceDef] = useState()

  const params = useParams()
  const currRef = useRef(null)
  const { pathname } = props.location?.state || ''
  console.log('Return address:', pathname)

  const { activityId } = params
  const location = useLocation()

  useEffect(() => {
    // Fetch character any time URL changes:
    const searchParams = new URLSearchParams(location)
    const character = searchParams.get('character')
    setSelectedCharacter(character)

    // Make API calls:
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
      case 'Story':
        // return <RaidSplash pgcr={pgcr} activityDef={activityDef} referenceDef={referenceDef} modeIsRaid={modeIsRaid} activityMode={activityMode} selectedCharacter={selectedCharacter} />
        return (
          <RaidSplash
            {...{
              pgcr,
              activityDef,
              referenceDef,
              modeIsRaid,
              activityMode,
              selectedCharacter,
            }}
          />
        )

      case 'AllPvP':
      case 'Gambit':
        return (
          <PvpSplash
            {...{
              pgcr,
              activityDef,
              referenceDef,
              modeIsRaid,
              activityMode,
              selectedCharacter,
            }}
          />
        )
      default:
        return (
          <PvpSplash
            {...{
              pgcr,
              activityDef,
              referenceDef,
              modeIsRaid,
              activityMode,
              selectedCharacter,
            }}
          />
        )
    }
  }

  return <>{referenceDef && activityDef && <RenderPgcr />}</>
}
