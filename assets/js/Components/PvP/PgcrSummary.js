/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react'

import { GetPGCRList } from '../../Utils/API/API_Requests'
import Shimmer from '../../Utils/Loading/Shimmer'
import PrecisionChart from './PrecisionChart'
import PrecisionWeaponKills from '../WeaponSummary/PrecisionWeaponKills'
import AbilityChart from './AbilityChart'
import { getUrlDetails } from '../../Utils/HelperFunctions'

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
  const { membershipType, membershipId, characterId } = props.match.params
  const { gameMode } = getUrlDetails()

  console.log('pgcrSummary')
  console.log(pgcrSummary)

  // Fetch the Activity definition - Map icon, name :
  useEffect(() => {
    const fetchPgcrSummary = async (activityId) => {
      const result = await GetPGCRList({
        params: { membershipType, membershipId, characterId, gameMode },
      })
      setPgcrSummary(result)
      console.log('fetchPgcrSummary')
      console.log(result)
    }
    fetchPgcrSummary()
  }, [props])

  const Charts = (
    <>
      <h2 className='heading-capitalize'>PRECISION KILLS:</h2>
      <div className='small-chart-wrapper'>
        <PrecisionChart chartName={'precisionKills'} {...pgcrSummary} {...props} />
        <PrecisionChart chartName={'averageLifeTime'} {...pgcrSummary} {...props} />
      </div>
      <h2 className='heading-capitalize'>WEAPON DATA:</h2>
      <div className='small-chart-wrapper'>
        <PrecisionWeaponKills {...pgcrSummary} />
      </div>
      <h2 className='heading-capitalize'>KILLS BREAKDOWN:</h2>
      <div className='small-chart-wrapper'>
        <AbilityChart {...pgcrSummary} />
      </div>
    </>
  )

  return <>{pgcrSummary ? Charts : <Loading />}</>
}
