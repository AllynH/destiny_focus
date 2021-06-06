/* eslint-disable max-len */
import React, { useState, useEffect } from 'react'

import { useDispatch } from 'react-redux'

import { GetProfileWithArgs, GetActivityDefinition } from '../../Utils/API/API_Requests'
import { PROGRESSION_DATA } from '../../Data/destinyEnums'
import { getUrlDetails } from '../../Utils/HelperFunctions'
import ProgressionCircles from './ProgressionCircle'

import { setProgressions } from '../../Redux/Actions'

export default function GetProgresions(props) {
  const [profile, setProfile] = useState(null)
  const dispatch = useDispatch()
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

      // Dispatch progressionsReducer:
      const setCharProgressions = () => {
        const tempList = []
        Object.keys(PROGRESSION_DATA).map((m) => {
          const curProg = result?.Response?.characterProgressions?.data[characterId]?.progressions[
            PROGRESSION_DATA[m].hash
          ]
          const tempData = { [PROGRESSION_DATA[m].hash]: curProg }
          tempList.push(tempData)
        })
        dispatch(
          setProgressions({ progressions: { values: tempList, logged: new Date().toISOString() } }),
        )
      }
      setCharProgressions()
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
  const [prog, setProg] = useState(null)
  const {
    progressModeHash, modeProgressions, mode, maxRank,
  } = props

  useEffect(() => {
    const fetchProgressionsDefinition = async () => {
      const result = await GetActivityDefinition({
        params: { definition: 'DestinyProgressionDefinition', defHash: progressModeHash },
      })
      setProg(result)
    }
    fetchProgressionsDefinition()
  }, [props])

  return (
    <>
      {prog ? (
        <DisplayProgression
          mode={mode}
          modeProgressions={modeProgressions}
          progressionsData={prog}
          maxRank={maxRank}
        />
      ) : (
        <div></div>
      )}
    </>
  )
}

function DisplayProgression(props) {
  const {
    progressionsData, modeProgressions, mode, maxRank,
  } = props

  return (
    <div className='progressions-item-wrap'>
      <h3 className='progressions-mode-title'>{mode}</h3>
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
            <div className='progressions-title'>Rank:{' '}</div>
            <div className='progressions-value'>{` [${modeProgressions.progressToNextLevel} : ${modeProgressions.nextLevelAt}]`}</div>
          </div>
          <div className='progressions-text'>
            <div className='progressions-title'>Progress:{' '}</div>
            <div className='progressions-value'>{` [${modeProgressions.currentProgress} : ${maxRank}]`}</div>
          </div>
          <div className='progressions-text'>
            <div className='progressions-title'>Completed:{' '}</div>
            <div className='progressions-value'>{` ${Number(
              (modeProgressions.currentProgress / maxRank) * 100,
            ).toFixed(0)}%`}</div>
          </div>
          {modeProgressions.currentResetCount ? (
            <div className='progressions-text'>
              <div className='progressions-title'>Resets:{' '}</div>
              <div className='progressions-value'>{` ${modeProgressions.currentResetCount}`}</div>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  )
}
