import React, { useState, useEffect } from 'react'

import { useDispatch } from 'react-redux'
import { DestinyProgression, DestinyProgressionDefinition } from 'bungie-api-ts/destiny2';

import { GetProfileWithArgs, GetActivityDefinition } from '../../Utils/API/API_Requests'
import { PROGRESSION_DATA, ProgressionInterface, ProgressionNameKey } from '../../Data/destinyEnums'
import { getUrlDetails } from '../../Utils/HelperFunctions'
import ProgressionCircles from './ProgressionCircle'
import Checkboxes from './Checkboxes'
import { ProgressBar } from '../Progress/ProgressBar'

import { setProgressions } from '../../Redux/Actions'

export default function GetProgressions(props: { updateCount: number }) {
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
      // console.log('Profile result:')
      // console.log(result)
      // console.log(characterId);

      setProfile(result)

      // Dispatch progressionsReducer:
      const setCharProgressions = () => {
        const tempList:  {[x: number]: ProgressionInterface}[]  = []
        Object.keys(PROGRESSION_DATA).forEach((m: ProgressionNameKey) => {
          const curProg: ProgressionInterface = result?.Response?.characterProgressions?.data[characterId]?.progressions[
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
  }, [props.updateCount])

  return (
    <div className='progressions-wrapper'>
      {profile
        ? Object.keys(PROGRESSION_DATA).map((m: ProgressionNameKey, index: number) => (
            <CreateSingleProgression
              key={index}
              mode={m}
              progressModeHash={PROGRESSION_DATA[m].hash}
              maxRank={PROGRESSION_DATA[m].maxRank}
              profileProgressions={
                profile.Response.characterProgressions.data[characterId].progressions[
                  PROGRESSION_DATA[m].hash
                ]
              }
              profileStreak={
                profile.Response.characterProgressions.data[characterId].progressions[
                  PROGRESSION_DATA[m].streakHash
                ]
              }
              {...profile}
              // {...props}
            />
        ))
        : ''}
    </div>
  )
}

// interface ProgressionProps {
//   progressModeHash: number,
//   profileProgressions: DestinyProgression,
//   profileStreak: DestinyProgression,
//   mode: string,
//   maxRank: number,
// }
interface DisplayProgressionsInterface {
  progressModeHash?: number,
  profileProgressions: DestinyProgression,
  profileStreak: DestinyProgression,
  mode: string,
  maxRank: number,
  progressionsDefinition?: DestinyProgressionDefinition,

}
function CreateSingleProgression(props: DisplayProgressionsInterface) {
  const [prog, setProg] = useState<DestinyProgressionDefinition>(null)
  const {
    progressModeHash, profileProgressions, profileStreak, mode, maxRank,
  } = props

  useEffect(() => {
    const fetchProgressionsDefinition = async () => {
      const result: DestinyProgressionDefinition = await GetActivityDefinition({
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
          profileProgressions={profileProgressions}
          profileStreak={profileStreak}
          progressionsDefinition={prog}
          maxRank={maxRank}
        />
      ) : (
        <div></div>
      )}
    </>
  )
}


function DisplayProgression(props: DisplayProgressionsInterface) {
  const {
    progressionsDefinition, profileProgressions, profileStreak, mode, maxRank,
  } = props

  /* Streak data: */
  const streakCount = profileStreak.currentProgress
  const arrSize = 5
  const streakArray = Array(arrSize).fill(true).fill(false, streakCount, arrSize)

  /* Progress data: */
  const currentStep = Math.min(profileProgressions.level, progressionsDefinition.steps.length - 1)
  const progress = Number(((profileProgressions.currentProgress / maxRank) * 100).toFixed(0))

  /* Styling: */
  const overflowFlag = profileProgressions.level === progressionsDefinition.steps.length
  const modeColour =
    `rgba(${progressionsDefinition.color.red},
      ${progressionsDefinition.color.green},
      ${progressionsDefinition.color.blue},
      ${progressionsDefinition.color.alpha})`
  const overflowBorder = {
    borderColor:
      `rgba(${progressionsDefinition.color.red},
        ${progressionsDefinition.color.green},
        ${progressionsDefinition.color.blue},
        ${progressionsDefinition.color.alpha})`,
  }
  const borderStyle = overflowFlag ? overflowBorder : {}
  const gradient = {
    background:
    // eslint-disable-next-line max-len
    `linear-gradient(45deg, rgba(255,255,255,0) 0%, rgba(${progressionsDefinition.color.red}, ${progressionsDefinition.color.green}, ${progressionsDefinition.color.blue}, 1) 100%)`,
  }
  const overFlowStyle = { ...gradient, ...borderStyle }

  return (
    <div
      className={`progressions-item-wrap ${overflowFlag ? 'overflow' : ''}`}
      style={overflowFlag ? overFlowStyle : {}}
    >
      <h3 className='progressions-mode-title'>{mode}</h3>
      <div className='progressions-chart-text-wrap'>
        <div className={`${overflowFlag ? 'div-shimmer div-circle' : ''}`}>
          <ProgressionCircles
            progressionsDefinition={progressionsDefinition}
            profileProgressions={profileProgressions}
            maxRank={maxRank}
            currentStep={currentStep}
          />
        </div>
        <div className='progressions-text-wrap'>
          <div className='progressions-step-name'>
            {progressionsDefinition.steps[currentStep].stepName}
          </div>
          <div className='progressions-text'>
            <div className='progressions-title'>Rank: </div>
            <div className='progressions-value'>{` [${profileProgressions.progressToNextLevel} : ${profileProgressions.nextLevelAt}]`}</div>
          </div>
          <div className='progressions-text'>
            <div className='progressions-title'>Progress: </div>
            <div className='progressions-value'>{` [${profileProgressions.currentProgress} : ${maxRank}]`}</div>
          </div>
          <div className='progressions-text'>
            <div className='progressions-title'>This week: </div>
            <div className='progressions-value'>{`${profileProgressions.weeklyProgress}`}</div>
          </div>
          <div className='progressions-text'>
            <div className='progressions-title'>Resets: </div>
            <div className='progressions-value'>
              {profileProgressions.currentResetCount ? profileProgressions.currentResetCount : 0}
            </div>
          </div>
          <Checkboxes streakArray={streakArray} modeColour={modeColour} />
        </div>
      </div>
      <div className='progress-bar-wrap'>
        <ProgressBar
          progress={progress}
          theme={mode}
          message={'Completed'}
          steps={`${progress}%`}
        />
      </div>
    </div>
  )
}
