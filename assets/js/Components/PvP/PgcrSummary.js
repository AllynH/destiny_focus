/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react'

import { GetPGCRList } from '../../Utils/API/API_Requests'
import Shimmer from '../../Utils/Loading/Shimmer'
import PrecisionChart from './PrecisionChart'
import PrecisionWeaponKills from '../WeaponSummary/PrecisionWeaponKills'
import AbilityChart from './AbilityChart'
import PrecisionFocus from '../Focus/PrecisionFocus'
import { getUrlDetails } from '../../Utils/HelperFunctions'
import { AvgWeaponAbilityKills } from '../../Utils/HelperFunctions/KdrFunctions'

import './style.css'

export function PcgrStats(props) {
  return (
    <ul>
      {props.Response.map((p, index) => (
        <li key={index}>{p.PGCR}</li>
      ))}
    </ul>
  )
}

export function Loading() {
  return (
    <>
      <h3 className='loading-text'>Hold on, I'm pulling a lot of data...</h3>
      <Shimmer />
    </>
  )
}

export default function PgcrSummary(props) {
  const [pgcrSummary, setPgcrSummary] = useState()
  const [avgKillSummary, setAvgKillSummary] = useState()
  const { membershipType, membershipId, characterId } = props.match.params
  const { gameMode } = getUrlDetails()
  const focusGoals = props.focusReducer?.payload
  const myArray = props.activityList?.Response?.activities

  console.log('pgcrSummary')
  console.log(pgcrSummary)

  // Fetch the Activity definition - Map icon, name :
  useEffect(() => {
    const fetchPgcrSummary = async (activityId) => {
      const result = await GetPGCRList({
        params: { membershipType, membershipId, characterId, gameMode },
      })
      setPgcrSummary(result)
      // console.log('fetchPgcrSummary')
      // console.log(result)
      setAvgKillSummary(AvgWeaponAbilityKills(result))

    }
    fetchPgcrSummary()
  }, [myArray])

  const Charts = (
    <>
      <h2 className='heading-capitalize'>PLAYSTYLE:</h2>
      <div className='small-chart-wrapper flex-direction'>
        <PrecisionChart chartName={'precisionKills'} {...pgcrSummary} {...props} />
        <PrecisionChart chartName={'averageLifeTime'} {...pgcrSummary} {...props} />
      </div>
      <PrecisionFocus {...pgcrSummary} chartData={avgKillSummary} {...props} />
      <h2 className='heading-capitalize'>WEAPON DATA:</h2>
      <div className='small-chart-wrapper'>
        <PrecisionWeaponKills {...pgcrSummary} />
      </div>
      <h2 className='heading-capitalize'>KILLS BREAKDOWN:</h2>
      <div className='small-chart-wrapper'>
        { pgcrSummary && avgKillSummary && <AbilityChart {...pgcrSummary} chartData={avgKillSummary} />}
      </div>
    </>
  )

  return <>{pgcrSummary ? Charts : <Loading />}</>
}
