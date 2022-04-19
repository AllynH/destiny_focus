import React, { useState, useEffect } from 'react'

import { ServerResponse , DestinyActivityHistoryResults } from 'bungie-api-ts/destiny2'
import PGCR from './PGCR'
import { GetUserPGCRList } from '../../Utils/API/API_Requests'

interface PgcrListInterface {
  activityList: ServerResponse<DestinyActivityHistoryResults>,
}

export default function PgcrList(props: PgcrListInterface) {
  const { activityList } = props
  const [savedPgcrs, setSavedPgcrs] = useState(null)

  const myArray = activityList?.Response?.activities

  // console.log('PgcrList.js')
  // console.log(props)
  // console.log(myArray)

  // Fetch the users saved PGCR list:
  useEffect(() => {
    const fetchUserPgcrList = async () => {
      const result = await GetUserPGCRList()
      setSavedPgcrs(result.user_pgcrs)
      // console.log('fetchUserPgcrList')
      // console.log(result)
    }
    fetchUserPgcrList()
  }, [activityList])

  return (
    <div>
      {savedPgcrs
        && myArray.map((p, index) => (
          <li className={'pgcr pgcr-item'} key={index}>
            <PGCR
              historicalStatsGroup={p}
              favourite={savedPgcrs.includes(Number(p.activityDetails.instanceId))}
            />
          </li>
        ))}
    </div>
  )
}
