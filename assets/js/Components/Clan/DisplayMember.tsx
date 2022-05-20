import { DestinyActivity, DestinyCharacterActivitiesComponent, DestinyProfileResponse, SingleComponentResponse } from 'bungie-api-ts/destiny2';
import React, { useEffect, useState } from 'react'
import { GetProfileWithArgs } from '../../Utils/API/API_Requests'

interface DisplayMemberInterface {
  membershipId: string,
  membershipType: string,
}

export default function DisplayMember(props: DisplayMemberInterface) {

  const [profile, setProfile] = useState<DestinyProfileResponse>(undefined)
  const { membershipId, membershipType } = props


  useEffect(() => {
    const fetchUserProfile = async () => {
      const result = await GetProfileWithArgs({
        params: {
          membershipId,
          membershipType,
          // characterId,
        },
      })
      setProfile(result)
      }
      fetchUserProfile()
  }, [])

  console.log('GetProfileWithArgs:', membershipId )
  console.log(profile)

  return(
    <div className="display-member-wrapper">
      <div>Some content!!!</div>
      <div>Some content!!!</div>
      <div>Some content!!!</div>
    </div>
  )
}
