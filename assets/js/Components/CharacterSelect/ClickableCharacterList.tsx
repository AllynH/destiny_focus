import React, { useEffect, useState } from 'react'

// import { ServerResponse } from 'bungie-api-ts/common'
// import { DestinyProfileResponse } from 'bungie-api-ts/destiny2'
import { GetCharactersResponseInterface } from '../../Types/DestinyFocus/GetCharacter'

import Shimmer from '../../Utils/Loading/Shimmer'
import { GetCharacters } from '../../Utils/API/API_Requests'
// import CharacterCardMinimal from './CharacterCardMinimal'

import './style.css'
import CharacterCard from './CharacterCard'

interface CharacterListInterface {
  memberships: {
    membershipId: string | number,
    membershipType: string | number,
    characterId: string | number,
    platform?: string | number,
  }
  updateState: boolean,
}

export default function ClickableCharacterList(props: CharacterListInterface) {
  const [charactersResponse, setCharactersResponse] = useState<GetCharactersResponseInterface>(null)
  const {
    platform, membershipId, membershipType, characterId,
  } = props.memberships
  const { updateState } = props

  useEffect(() => {
    const fetchProfile = async () => {
      const result = await GetCharacters()
      setCharactersResponse(result)
      console.log('fetchProfile')
      console.log(result)
    }
    fetchProfile()
  }, [platform, membershipId, membershipType])

  return (
    <div className='card-wrapper'>
      {charactersResponse?.Response ? (
        Object.keys(charactersResponse.Response).map((p, index) => (
          <div key={index} className='card-list'>
            <CharacterCard
              linkUrl={`/auth/choose_focus/${membershipType}/${membershipId}/${p}`}
              key={index}
              character={charactersResponse.Response[p]}
              // character={charactersResponse.Response?.characters?.data[p]}
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
