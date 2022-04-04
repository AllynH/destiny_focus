import React, { useState, useEffect } from 'react'

import { useDispatch } from 'react-redux'
import {
  DestinyProgression,
  DestinyProgressionDefinition,
  DestinyObjectiveProgress,
} from 'bungie-api-ts/destiny2'

import { GetProfileWithArgs, GetActivityDefinition } from '../../Utils/API/API_Requests'
import {
  PROGRESSION_DATA,
  ProgressionInterface,
  ProgressionNameKey,
  TRIALS_CARD_DATA,
  TrialsPassageKey,
} from '../../Data/destinyEnums'
import { getUrlDetails } from '../../Utils/HelperFunctions'
import ProgressionCircles from './ProgressionCircle'
import Checkboxes from './Checkboxes'
import { ProgressBar } from '../Progress/ProgressBar'

import { setProgressions } from '../../Redux/Actions'
import TrialsCard from '../Trials/TrialsCard'

type uninstancedItemObjectives = {
  [key: number]: DestinyObjectiveProgress[]
}

interface TrialsCardDataAndHash {
  trialsCardData: uninstancedItemObjectives
  trialsCardHash: number
}

export default function GetProgressions(props: { updateCount: number }) {
  const [profile, setProfile] = useState(null)
  const [trialsCard, setTrialsCard] = useState({
    trialsCardData: undefined,
    trialsCardHash: undefined,
  })
  const dispatch = useDispatch()
  const { membershipType, membershipId, characterId } = getUrlDetails()

  // const storedTrialsCardData = [
  //     {
  //       complete: false,
  //       completionValue: 7,
  //       objectiveHash: 1586211619,
  //       progress: 2,
  //       visible: true,
  //     },
  //     {
  //       complete: false,
  //       completionValue: 1,
  //       objectiveHash: 2369244651,
  //       progress: 0,
  //       visible: false,
  //     },
  //     {
  //       complete: true,
  //       completionValue: 1,
  //       objectiveHash: 2211480687,
  //       progress: 1,
  //       visible: true,
  //     },
  //     {
  //       complete: true,
  //       completionValue: 1,
  //       objectiveHash: 984122744,
  //       progress: 10,
  //       visible: true,
  //     },
  //   ]

  //   const storedTrialsCardDataAndHash: TrialsCardDataAndHash = {
  //     trialsCardData: storedTrialsCardData,
  //     trialsCardHash: 1600065451,
  //   }
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
        const tempList: { [x: number]: ProgressionInterface }[] = []
        Object.keys(PROGRESSION_DATA).forEach((m: ProgressionNameKey) => {
          const curProg: ProgressionInterface =
            result?.Response?.characterProgressions?.data[characterId]?.progressions[
              PROGRESSION_DATA[m].hash
            ]
          const tempData = { [PROGRESSION_DATA[m].hash]: curProg }
          tempList.push(tempData)
        })
        dispatch(
          setProgressions({ progressions: { values: tempList, logged: new Date().toISOString() } })
        )
      }
      setCharProgressions()

      // Search for Trials card data:
      const getTrialsCards = (): TrialsCardDataAndHash => {
        const trialsCardDataArray: uninstancedItemObjectives[] = Object.keys(TRIALS_CARD_DATA)
          .map(
            (m: TrialsPassageKey) =>
              result?.Response?.characterProgressions?.data[characterId].uninstancedItemObjectives[
                TRIALS_CARD_DATA[m].hash
              ]
          )
          .filter((item: uninstancedItemObjectives) => item !== undefined)
        const trialsCardData = trialsCardDataArray[0]

        // Search GetProfile for active Trials card hash:
        const hashList = Object.keys(TRIALS_CARD_DATA).map(
          (item: TrialsPassageKey) => TRIALS_CARD_DATA[item].hash
        )
        const bountyHashList = Object.keys(
          result.Response.characterProgressions.data[characterId].uninstancedItemObjectives
        )
        // Return an array in the form of: [ 1600065451, undefined, undefined, undefined, undefined ]
        const foundHashArrayMap = hashList.map((hash) =>
          (bountyHashList.includes(String(hash)) ? hash : undefined)
        )
        // Remove undefined, leave an array with only Numbers
        const trialsCardHashArray = foundHashArrayMap.filter(Number)
        // Take 1st value - there will only ever be 1 Trials Card active:
        const trialsCardHash = trialsCardHashArray[0]

        const returnCardData: TrialsCardDataAndHash = {
          trialsCardData,
          trialsCardHash,
        }
        return returnCardData
      }
      setTrialsCard(getTrialsCards())
      // setTrialsCard(storedTrialsCardDataAndHash)
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
                  PROGRESSION_DATA[m]?.streakHash
                ]
              }
              {...profile}
              // {...props}
            />
          ))
        : ''}
      {trialsCard.trialsCardData ? (
        <TrialsCard
          trialsCard={trialsCard.trialsCardData}
          definitionHash={trialsCard.trialsCardHash}
        />
      ) : (
        ''
      )}
    </div>
  )
}

interface DisplayProgressionsInterface {
  progressModeHash?: number
  profileProgressions: DestinyProgression
  profileStreak: DestinyProgression
  mode: string
  maxRank: number
  progressionsDefinition?: DestinyProgressionDefinition
}
function CreateSingleProgression(props: DisplayProgressionsInterface) {
  const [prog, setProg] = useState<DestinyProgressionDefinition>(null)
  const { progressModeHash, profileProgressions, profileStreak, mode, maxRank } = props

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
  const { progressionsDefinition, profileProgressions, profileStreak, mode, maxRank } = props

  /* Streak data: */
  const streakCount = profileStreak?.currentProgress
  const arrSize = 5
  const streakArray = Array(arrSize).fill(true).fill(false, streakCount, arrSize)

  /* Progress data: */
  const currentStep = Math.min(profileProgressions.level, progressionsDefinition.steps.length - 1)
  const progress = Number(((profileProgressions.currentProgress / maxRank) * 100).toFixed(0))

  /* Styling: */
  const overflowFlag = profileProgressions.level === progressionsDefinition.steps.length
  const modeColour = `rgba(${progressionsDefinition.color.red},
      ${progressionsDefinition.color.green},
      ${progressionsDefinition.color.blue},
      ${progressionsDefinition.color.alpha})`
  const overflowBorder = {
    borderColor: `rgba(${progressionsDefinition.color.red},
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
              {profileProgressions.currentResetCount ? profileProgressions.currentResetCount : 0 }
            </div>
          </div>
          {streakCount && <Checkboxes streakArray={streakArray} modeColour={modeColour} />}
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
