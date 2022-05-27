import React, { useEffect, useState } from 'react'

import { DestinyProfileResponse, ServerResponse } from 'bungie-api-ts/destiny2'
import { GetCharactersResponseInterface } from '../../Types/DestinyFocus/GetCharacter'
import { GetCharactersWithArgs, GetProfileWithArgs } from '../../Utils/API/API_Requests'
import checkLoggedInCharacter from '../../Utils/HelperFunctions/characterSelection'
import SvgLoading from '../../Utils/Loading/SvgLoading'
import CharacterCardMinimal from '../CharacterSelect/CharacterCardMinimal'

interface DisplayMemberInterface {
  membershipId: string
  membershipType: string
}

export default function DisplayMember(props: DisplayMemberInterface) {
  const [profile, setProfile] = useState<ServerResponse<DestinyProfileResponse>>(undefined)
  const [ characters, setCharacters ] = useState<GetCharactersResponseInterface>(null)
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
      // console.log('fetchUserProfile')
      // console.log(result)
    }
    fetchUserProfile()
  }, [membershipId, membershipType])

  useEffect(() => {
    const fetchProfile = async () => {
      const result = await GetCharactersWithArgs({
        params: { membershipId, membershipType },
      })
      setCharacters(result)
      // console.log('setCharacters')
      // console.log(result)
    }
    fetchProfile()
  }, [membershipId, membershipType])

  return (
    <div className='display-member-wrapper'>
      {profile?.Response && characters?.Response
        ? Object.keys(profile.Response.characters.data).map((c, index) => (
        <CharacterCardMinimal
          key={index}
          profile={characters.Response[c]}
          membershipType={membershipType}
          membershipId={membershipId}
          loggedInUser={checkLoggedInCharacter(String(membershipType) , String(membershipId))}
        />
          ))
        // : <div className="display-member-loading"><ShimmerNoPadding /></div> }
        : <div className="display-member-loading"><SvgLoading /></div> }
    </div>
  )
}
