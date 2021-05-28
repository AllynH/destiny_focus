/* eslint-disable linebreak-style */
/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react'

import PGCR from './PGCR'
import { GetUserPGCRList } from '../../Utils/API/API_Requests'

export default function PgcrList(props) {
  const { activityList } = props
  const [savedPgcrs, setSavedPgcrs] = useState(null)

  const pgcrList = []
  const myArray = activityList?.Response?.activities

  // console.log(myArray)

  // Fetch the users saved PGCR list:
  useEffect(() => {
    const fetchUserPgcrList = async () => {
      const result = await GetUserPGCRList({})
      setSavedPgcrs(result.user_pgcrs)
      console.log('fetchUserPgcrList')
      console.log(result)
    }
    fetchUserPgcrList()
  }, [activityList])

  // const CreatePgcrList = () => (
  //   <div>
  //     {myArray.map((p, index) =>
  //       savedPgcrs.map((saved, ii) => (
  //         <li className={'pgcr pgcr-item'} key={index}>
  //           <PGCR {...p} />
  //         </li>
  //       ))
  //     )}
  //   </div>
  // )

  return (
    <div>
      {savedPgcrs
        && myArray.map((p, index) => (
          <li className={'pgcr pgcr-item'} key={index}>
            <PGCR {...p} favourite={savedPgcrs.includes(Number(p.activityDetails.instanceId))} />
          </li>
        ))}
    </div>
  )
}
