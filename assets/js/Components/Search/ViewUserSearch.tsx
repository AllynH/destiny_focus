import React from 'react'

import { UserInfoCard } from 'bungie-api-ts/user'

interface ViewLinkedProfileInterface {
  destinyMemberships: UserInfoCard[]
}
export default function ViewUserSearch(props: ViewLinkedProfileInterface) {

  const { destinyMemberships } = props
  return (
    <div className='user-profile-wrapper'>
      <div className='user-profile'>
      <div className="profile-sub-heading">
        Linked accounts:
      </div>
        <ul className="user-profile-list list-style-none">
          {
            destinyMemberships.map((m: UserInfoCard, index2: number) => (
                <li key={index2} className="list-style-none">
                  <div className="character-search-wrapper">
                    <div className="character-search-icon destiny-icon"
                      style={{backgroundImage: `url(https://www.bungie.net${m.iconPath })`}}
                    ></div>
                    <div className="character-search-username">{m.displayName}</div>
                    {/* <div className="character-search-username">{m.applicableMembershipTypes}</div> */}
                  </div>
            </li>
              ))
            }


        </ul>
      </div>

    </div>
  )
}
