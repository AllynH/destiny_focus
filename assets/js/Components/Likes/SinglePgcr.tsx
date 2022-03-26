import { DestinyPostGameCarnageReportData, ServerResponse } from 'bungie-api-ts/destiny2'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'

import { CharacterPropsInterface } from '../../Data/CharacterProps'
import { BASIC_ACTIVITY_MODES, PgcrTypes } from '../../Data/destinyEnums'

import { GetPGCR } from '../../Utils/API/API_Requests'
import { CreateTeams, PgcrHeader } from '../PGCR/PgcrPreview'
import LikedActivity from './LikedActivity'

interface SinglePgcrInterface {
  pgcrNumber: number
}

export default function SinglePgcr(props: SinglePgcrInterface) {
  const { pgcrNumber } = props

  const [pgcr, setPgcr] = useState<ServerResponse<DestinyPostGameCarnageReportData>>(null)
  const [activityMode, setActivityMode] = useState<PgcrTypes>('AllPvP')
  const [isExpanded, setIsExpanded] = useState(false)
  // const [activityMode, setActivityMode] = useState<PgcrTypes>('AllPvP')
  const params = useParams()
  const { characterId } = params as CharacterPropsInterface

  useEffect(() => {
    const fetchPgcr = async (activityId: string) => {
      const result = await GetPGCR({ params: { activityId } })
      // console.log(result)
      setPgcr(result)
      setActivityMode(BASIC_ACTIVITY_MODES[result?.Response?.activityDetails?.mode] as PgcrTypes)
    }
    fetchPgcr(String(pgcrNumber))
  }, [])

  const handleClick = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className='pgcr-wrapper'>
      <ul
        className='pgcr pgcr-pointer list-style-none'
        role='button'
        onClick={() => {
          handleClick()
        }}
      >
        {pgcr?.Response && (
          <>
            <LikedActivity
              postGameCarnageReportData={pgcr.Response}
              isPgcr={true}
              activityMode={activityMode}
              isExpanded={isExpanded}
              currentGameMode={'pvp'}
              favourite={true}
              characterId={characterId}
            />
            {isExpanded && (
              <>
                <PgcrHeader activityMode={activityMode} />
                <CreateTeams entriesList={pgcr.Response.entries} activityMode={activityMode} />
              </>
            )}
          </>
        )}
      </ul>
    </div>
  )
}
