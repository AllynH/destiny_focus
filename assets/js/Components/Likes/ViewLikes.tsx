import React, { useEffect, useState } from 'react'
import { GetUserPGCRList } from '../../Utils/API/API_Requests'
import { returnFocusDetailsFromActivityId, returnFocusFromActivityId } from '../../Utils/HelperFunctions/activityModes'
import SelectActivityIcon from '../PGCR_Splash/SelectActivityIcon'
import SinglePgcr from './SinglePgcr'

import './style.css'

interface likesResponse {
  errorStatus: ''
  // eslint-disable-next-line camelcase
  user_pgcrs: Array<number>
  // eslint-disable-next-line camelcase
  mode_data: { [key: string]: [number] }
}

export default function ViewLikes() {
  const [likes, setLikes] = useState<likesResponse>(null)

  useEffect(() => {
    const fetchLikes = async () => {
      const result: likesResponse = await GetUserPGCRList()
      setLikes(result)
    }
    fetchLikes()
  }, [])

  return (
    <div className='liked-activity-wrapper'>
      <h1 >Liked activity</h1>

      {likes &&
        Object.keys(likes.mode_data).map((mode: string, index: number) => (
          <div key={index} className='liked-activity-single-wrapper'>
            <h2 key={index} className='liked-activity-heading'>
              {returnFocusDetailsFromActivityId(mode).activityName}
            </h2>
            <div className='liked-activity-single-activity'>
              <div className='liked-activity-sidebar'>
                <SelectActivityIcon
                activityMode={returnFocusFromActivityId(mode)}
                iconStyle={'smallIconPgcr'}
                />
              </div>
              <div className='liked-activity-list'>
                <ul className='no-margin list-style-none activity-list'>
                  {likes.mode_data[mode].map((pgcrNumber: number, indexInner: number) => (
                    <li className={'pgcr pgcr-item'} key={indexInner}>
                      <SinglePgcr pgcrNumber={pgcrNumber} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}
