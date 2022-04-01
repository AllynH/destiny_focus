import React, { useEffect, useState } from 'react'
import { GetUserPGCRList } from '../../Utils/API/API_Requests'
import {
  returnFocusDetailsFromActivityId,
  returnFocusFromActivityId,
} from '../../Utils/HelperFunctions/activityModes'
import SelectActivityIcon from '../PGCR_Splash/SelectActivityIcon'
import SinglePgcr from './SinglePgcr'

import likePgcrImage from '../../../img/FAQ/Destiny-Focus_add_favourite.png'

import './style.css'
import PgcrStorageView from './PgcrStorage'

export interface likesResponseInterface {
  errorStatus: ''
  // eslint-disable-next-line camelcase
  user_pgcrs: Array<number>
  // eslint-disable-next-line camelcase
  mode_data: { [key: string]: [number] }
  // eslint-disable-next-line camelcase
  pgcr_allocation: number
  // eslint-disable-next-line camelcase
  pgcr_count: number
}

export default function ViewLikes() {
  const [likes, setLikes] = useState<likesResponseInterface>(null)

  useEffect(() => {
    const fetchLikes = async () => {
      const result: likesResponseInterface = await GetUserPGCRList()
      setLikes(result)
      console.log("viewLikes")
      console.log(result)
      }
    fetchLikes()
  }, [])

  return (
    <div className='liked-activity-pgcr-storage-wrapper'>
      <div className='liked-activity-wrapper'>
        <h1>Liked activity</h1>

        {likes?.user_pgcrs.length > 0 ? (
          Object.keys(likes.mode_data).map((mode: string, index: number) => (
            <div key={index} className='liked-activity-single-wrapper'>
              <h2 key={index} className='liked-activity-heading'>
                {returnFocusDetailsFromActivityId(mode)?.activityName || 'Unknown activity!'}
              </h2>
              <div className='liked-activity-single-activity'>
                <div className='liked-activity-sidebar'>
                  <SelectActivityIcon
                    activityMode={returnFocusFromActivityId(mode) || 'pvp'}
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
          ))
        ) : (
          <div className='liked-activity-single-wrapper'>
            <h2 className='liked-activity-heading'>Add some activities!</h2>
            <div className='liked-activity-single-activity'>
              <p className='liked-activity-description'>
                Click on the heart icon when viewing a game, to save it to your favourites!
              </p>
              <div
                className='faq-image-container'
                style={{
                  background: `url(${likePgcrImage})`,
                  height: 300,
                  maxWidth: 600,
                  backgroundPosition: 'center',
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  boxShadow: '3px 3px 15px black',
                  borderRadius: 5,
                }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {likes && (
        <div className='pgcr-storage-progress-wrapper'>
          <div className='liked-activity-single-wrapper'>
            <h2 className='liked-activity-heading'>Storage space</h2>
            <PgcrStorageView pgcrCount={likes.pgcr_count} pgcrAllocation={likes.pgcr_allocation} />
          </div>
        </div>
      )}

    </div>
  )
}
