/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react'

import { GetPGCRList } from '../../Utils/API/API_Requests'
import Shimmer from '../../Utils/Loading/Shimmer'
import PrecisionChart from './PrecisionChart'
import PrecisionWeaponKills from '../WeaponSummary/PrecisionWeaponKills'

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

export default function PgcrSummary(props) {
  const [pgcrSummary, setPgcrSummary] = useState()
  const { membershipType, membershipId } = props.match.params

  // Fetch the Activity definition - Map icon, name :
  useEffect(() => {
    const fetchPgcrSummary = async (activityId) => {
      const result = await GetPGCRList({ params: { membershipType, membershipId } })
      setPgcrSummary(result)
    }
    fetchPgcrSummary()
  }, [props])

  const Charts = (
    <>
      <div className='small-chart-wrapper'>
        <PrecisionChart chartName={'precisionKills'} {...pgcrSummary} />
        <PrecisionChart chartName={'averageLifeTime'} {...pgcrSummary} />
      </div>
      <div className='small-chart-wrapper'>
        <PrecisionWeaponKills {...pgcrSummary} />
        <p>Avg. life span (seconds)</p>
      </div>
    </>
  )

  return <>{pgcrSummary ? Charts : <Shimmer />}</>
}
