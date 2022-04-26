import React, { useEffect, useState } from 'react'
import { ViewUserData } from '../../Utils/API/API_Requests'
import { userCountResponse } from './types'

export default function UserDataPanel() {
  const [userData, setUserData] = useState<userCountResponse>(undefined)

  useEffect(() => {
    const fetchUserData = async () => {
      const result = await ViewUserData()
      setUserData(result)
    }
    fetchUserData()
  }, [])

  return (
    <section className='admin-data-wrapper'>
      <h2>User data:</h2>

      <div className={`admin-manifest-grid`}>
          <div className={'admin-item-title'}>Message: </div>
          <div>{userData && userData.message}</div>
          <div className={'admin-item-title'}>User count: </div>
          <div>{userData && userData.userCount}</div>
          <div className={'admin-item-title'}>PGCR count: </div>
          <div>{userData && userData.pgcrCount}</div>
      </div>

      <div className='pgcr-splash-player-wrapper'>
          <div

            className={`pgcr-splash-character-row`}
            role='button'
            // onClick={() => toggleOpen()}
          >
              <div className={`admin-user-grid`}>
                <div className='align-left padding-left'>Name:</div>
                <div className='align-left padding-left'>PGCR allocations</div>
                <div className='align-left padding-left'>PGCR count</div>
                <div className='align-left padding-left'>Last seen</div>
              </div>
            </div>
          </div>


      {userData &&
        userData.Response
          .sort((a, b) => (new Date(b.last_seen).valueOf() - new Date(a.last_seen).valueOf()))
          .map((u, index) => (
          <div key={index} className='pgcr-splash-player-wrapper hover-animation'>
          <div

            className={`pgcr-splash-character-row`}
            role='button'
            // onClick={() => toggleOpen()}
          >
              <div className={`admin-user-grid`}>
                <div className='align-left padding-left'>{u.unique_name}</div>
                <div className='align-left padding-left'>{u.pgcr_allocation}</div>
                <div className='align-left padding-left'>{u.pgcr_count}</div>
                <div className='align-left padding-left'>{u.last_seen}</div>
              </div>
            </div>
          </div>
        ))}
    </section>
  )
}
