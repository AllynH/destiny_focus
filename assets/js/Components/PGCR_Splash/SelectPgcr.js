import React, { useState, useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'

import { GetPGCRUnauth, GetActivityDefinitionUnauth } from '../../Utils/API/API_Requests'
import { BASIC_ACTIVITY_MODES } from '../../Data/destinyEnums'
import RaidSplash from './RaidSplash'
import PvpSplash from './PvpSplash'

import './style.css'

export default function SelectPgcr(props) {
  const [activeUserId, setActiveUserId] = useState(null)
  const [pgcr, setPgcr] = useState()
  const [modeIsRaid, setModeIsRaid] = useState()
  const [activityDef, setActivityDef] = useState()
  const [referenceDef, setReferenceDef] = useState()
  const params = useParams()
  const { pathname } = props?.location?.state || ''
  // console.log('props', props)
  // console.log('Return address:', pathname)

  const { activityId } = params
  const location = useLocation()

  useEffect(() => {
    // Fetch character any time URL changes:
    const searchParams = new URLSearchParams(location)
    const character = searchParams.get('character')
    setActiveUserId(character)

    // Make API calls:
    const fetchPgcr = async () => {
      const result = await GetPGCRUnauth({
        params: {
          activityId,
        },
      })
      console.log('SelectPGCR:')
      console.log(result)
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
    fetchPgcr()
  }, [props])

  const returnActivityMode = () => {
    const newMode = BASIC_ACTIVITY_MODES[pgcr.Response?.activityDetails?.mode]
    if (newMode) {
      return newMode
    }
    return 'AllPvP'
  }

  const RenderPgcr = () => {
    const activityMode = returnActivityMode()
    switch (activityMode) {
      case 'Raid':
      case 'Nightfall':
      case 'Dungeon':
      case 'Story':
      case 'Social':
        return (
          <RaidSplash
            {...{
              pgcr,
              activityDef,
              referenceDef,
              modeIsRaid,
              activityMode,
              activeUserId,
              pathname,
            }}
          />
        )

      case 'AllPvP':
      case 'Gambit':
      default:
        return (
          <PvpSplash
            {...{
              pgcr,
              activityDef,
              referenceDef,
              modeIsRaid,
              activityMode,
              activeUserId,
              pathname,
            }}
          />
        )
    }
  }

  return <>{referenceDef && activityDef && <RenderPgcr />}</>
}
