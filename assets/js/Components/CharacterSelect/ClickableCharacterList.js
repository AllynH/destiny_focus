import React, { useEffect, useState } from 'react'

import Shimmer from '../../Utils/Loading/Shimmer'
import { GetCharactersWithArgs } from '../../Utils/API/API_Requests'
import CharacterCard from './CharacterCard'

import './style.css'

// interface CharacterListInterface {
//   memberships: {
//     membershipId: string,
//     membershipType: string,
//     characterId: string,
//     platform?: string,
//   }
//   updateState: boolean,
// }

export default function ClickableCharacterList(props) {
  const [profile, setProfile] = useState()
  const {
    platform, membershipId, membershipType, characterId,
  } = props.memberships
  const { updateState } = props

  useEffect(() => {
    const fetchProfile = async () => {
      const result = await GetCharactersWithArgs({
        params: { membershipId, membershipType },
      })
      setProfile(result)
    }
    fetchProfile()
  }, [platform, membershipId, membershipType])

  return (
    <div className='card-wrapper'>
      {profile ? (
        Object.keys(profile).map((p, index) => (
          <div key={index} className='card-list'>
            <CharacterCard
              linkUrl={`/auth/choose_focus/${membershipType}/${membershipId}/${p}`}
              key={index}
              character={profile[p]}
              selected={p === characterId}
              updateState={updateState}
            />
          </div>
        ))
      ) : (
        <Shimmer />
      )}
    </div>
  )
}
