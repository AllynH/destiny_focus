import React, { useState, useEffect } from 'react'

import { RouteComponentProps } from 'react-router'

import { PgcrSummaryPropsInterface } from './types'

import { GetPGCRList } from '../../Utils/API/API_Requests'
import Shimmer from '../../Utils/Loading/Shimmer'
import PrecisionChart from './PrecisionChart'
import PrecisionWeaponKills from '../WeaponSummary/PrecisionWeaponKills'
import AbilityChart from './AbilityChart'
import PrecisionFocus from '../Focus/PrecisionFocus'
import { getUrlDetails } from '../../Utils/HelperFunctions'
import { AvgWeaponAbilityKills } from '../../Utils/HelperFunctions/KdrFunctions'
import ChartDropdown from './ChartDropdown'

import { CharacterPropsInterface } from '../../Data/CharacterProps'

import './style.css'
import AbilityKillFocus from '../Focus/AbilityKillFocus'
import { returnFocusDetailsFromActivityId } from '../../Utils/HelperFunctions/activityModes'

export function Loading() {
  return (
    <>
      <h2 className='heading-capitalize'>PLAYSTYLE:</h2>
      <Shimmer />
      <h2 className='heading-capitalize'>CUSTOM PLAYSTYLE:</h2>
      <Shimmer />
      <h2 className='heading-capitalize'>WEAPON DATA:</h2>
      <Shimmer />
      <h2 className='heading-capitalize'>KILLS BREAKDOWN:</h2>
      <div className='flex-direction'>
        <Shimmer />
      </div>
    </>
  )
}

export default function PgcrSummary(props: PgcrSummaryPropsInterface & RouteComponentProps) {
  const [pgcrSummary, setPgcrSummary] = useState(null)
  const [avgKillSummary, setAvgKillSummary] = useState(null)
  const { membershipType, membershipId, characterId } = props.match
    .params as CharacterPropsInterface
  const { gameMode } = getUrlDetails()
  const activityName = returnFocusDetailsFromActivityId(gameMode)?.focus
  const myArray = props.activityList?.Response?.activities

  // Fetch the Activity definition - Map icon, name :
  useEffect(() => {
    const fetchPgcrSummary = async () => {
      const result = await GetPGCRList({
        params: {
          membershipType: String(membershipType),
          membershipId: String(membershipId),
          characterId: String(characterId),
          activityName: String(activityName),
        },
      })
      setPgcrSummary(result)
      // console.log('fetchPgcrSummary')
      // console.log(result)
      setAvgKillSummary(AvgWeaponAbilityKills(result))
    }
    fetchPgcrSummary()
  }, [myArray])

  return (
    <>
      {pgcrSummary ? (
        <>
          <h2 className='heading-capitalize'>PLAYSTYLE:</h2>
          <div>
            <div className='small-chart-wrapper flex-direction'>
              <PrecisionChart chartName={'precisionKills'} {...pgcrSummary} {...props} />
              <PrecisionChart chartName={'averageLifeTime'} {...pgcrSummary} {...props} />
            </div>
            <PrecisionFocus {...pgcrSummary} chartData={avgKillSummary} {...props} />
          </div>
          <h2 className='heading-capitalize'>CUSTOM PLAYSTYLE:</h2>
          <div className='small-chart-wrapper flex-direction'>
            <ChartDropdown activityList={props.activityList} pgcrSummary={pgcrSummary} />
          </div>
          <h2 className='heading-capitalize'>WEAPON DATA:</h2>
          <div className='small-chart-wrapper'>
            <PrecisionWeaponKills {...pgcrSummary} />
          </div>
          <h2 className='heading-capitalize'>KILLS BREAKDOWN:</h2>
          <div className='small-chart-wrapper'>
            {pgcrSummary && avgKillSummary && (
              <AbilityChart {...pgcrSummary} chartData={avgKillSummary} />
            )}
          </div>
          <div className='small-chart-wrapper'>
            {pgcrSummary && avgKillSummary && (
              <AbilityKillFocus chartData={avgKillSummary} />
            )}
          </div>
        </>
      ) : (
        <Loading />
      )}
    </>
  )
}
