import React from 'react'

import { ServerResponse } from 'bungie-api-ts/common'
import { DestinyLinkedProfilesResponse } from 'bungie-api-ts/destiny2'
import { getDatePlayedFromTimestamp } from '../../Utils/HelperFunctions/getDateTime'

interface ViewLinkedProfileInterface {
  profile: ServerResponse<DestinyLinkedProfilesResponse>
}
export default function ViewLinkedProfile(props: ViewLinkedProfileInterface) {

  const { profile } = props
  return (
    <div className='user-profile-wrapper'>
      <div className='user-profile'>
      <div className="profile-sub-heading">
        Active account:
      </div>
        <ul className="user-profile-list list-style-none">
        <li className="list-style-none">
          <div className="profile-name-heading">
            <span className="profile-name-heading-name">{profile.Response.bnetMembership.bungieGlobalDisplayName}</span>
            <span className="profile-name-heading-code">#{profile.Response.bnetMembership.bungieGlobalDisplayNameCode}</span>
          </div>
        </li>
        <li className="list-style-none">
          <div className="profile-item-heading">Last online</div>
          <div className="profile-item-value">{getDatePlayedFromTimestamp(profile.Response.profiles[0].dateLastPlayed)}</div>
        </li>
        </ul>
      </div>

    </div>
  )
}
