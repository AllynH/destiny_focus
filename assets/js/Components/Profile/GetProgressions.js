import React, { useState, useEffect } from 'react'

import { GetProfileWithArgs, GetActivityDefinition } from '../../Utils/API/API_Requests'
import { PROGRESSION_DATA } from '../../Data/destinyEnums'
import { getUrlDetails } from '../../Utils/HelperFunctions'
import ProgressionCircles from './ProgressionCircle'

export default function GetProgresions(props) {
  const [profile, setProfile] = useState(null)
  const { membershipType, membershipId, characterId } = getUrlDetails()

  useEffect(() => {
    const fetchUserProfile = async () => {
      const result = await GetProfileWithArgs({
        params: {
          membershipId,
          membershipType,
          characterId,
        },
      })
      setProfile(result)
    }
    fetchUserProfile()
  }, [props])

  return (
    <div className='progressions-wrapper'>
      {profile
        ? Object.keys(PROGRESSION_DATA).map((m, index) => (
            <CreateSingleProgression
              key={index}
              mode={m}
              progressModeHash={PROGRESSION_DATA[m].hash}
              maxRank={PROGRESSION_DATA[m].maxRank}
              modeProgressions={
                profile.Response.characterProgressions.data[characterId].progressions[
                  PROGRESSION_DATA[m].hash
                ]
              }
              {...profile}
              {...props}
            />
        ))
        : ''}
    </div>
  )
}

function CreateSingleProgression(props) {
  const [progressions, setProgressions] = useState(null)
  const { progressModeHash, modeProgressions, mode, maxRank } = props

  useEffect(() => {
    const fetchProgressDefinition = async () => {
      const result = await GetActivityDefinition({
        params: { definition: 'DestinyProgressionDefinition', defHash: progressModeHash },
      })
      setProgressions(result)
    }
    fetchProgressDefinition()
  }, [props])

  return (
    <>
      {progressions ? (
        <DisplayProgression
          mode={mode}
          modeProgressions={modeProgressions}
          progressionsData={progressions}
          maxRank={maxRank}
        />
      ) : (
        <div></div>
      )}
    </>
  )
}

function DisplayProgression(props) {
  const { progressionsData, modeProgressions, mode, maxRank } = props

  return (
    <div className='progressions-item-wrap'>
      <h3 className='progressions-title'>{mode}</h3>
      <div className='progressions-chart-text-wrap'>
        <ProgressionCircles
          progressionsData={progressionsData}
          modeProgressions={modeProgressions}
          maxRank={maxRank}
        />
        <div className='progressions-text-wrap'>
          <div className='progressions-step-name'>
            {progressionsData.steps[modeProgressions.level].stepName}
          </div>
          <div className='progressions-text'>
            {`Rank: [${modeProgressions.progressToNextLevel} : ${modeProgressions.nextLevelAt}]`}
          </div>
          <div className='progressions-text'>
            {`Progress: [${modeProgressions.currentProgress} : ${maxRank}]`}
          </div>
          <div className='progressions-text'>
            {`Completed: ${Number((modeProgressions.currentProgress / maxRank) * 100).toFixed(0)}%`}
          </div>
          <div className='progressions-text'>
            {modeProgressions.currentResetCount
              ? `Reset count: ${modeProgressions.currentResetCount}`
              : ''}
          </div>
        </div>
      </div>
    </div>
  )
}
