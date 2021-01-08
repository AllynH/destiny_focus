import React, { useEffect, useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'

import Shimmer from '../../Utils/Loading/Shimmer'
import { GetCharactersWithArgs } from '../../Utils/API/API_Requests'
import CharacterCard from './CharacterCard'

import './style.css'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxHeight: 100,
    background: 'var(--crucible-red)',
    padding: 10,
    borderRadius: 5,
    textDecoration: 'none',
    color: 'var(--grey-bg)',
    width: 100,
    textAlign: 'center',
  },
}))

export default function ClickableCharacterList(props) {
  const [profile, setProfile] = useState()
  const classes = useStyles()
  const { membershipId, membershipType } = props.memberships

  useEffect(() => {
    const fetchProfile = async () => {
      const result = await GetCharactersWithArgs({
        params: { membershipId, membershipType },
      })
      setProfile(result)
    }
    fetchProfile()
  }, [props])

  return (
    <div className='card-wrapper'>
      {profile ? (
        Object.keys(profile).map((p, index) => (
          <div key={index} className='card-list'>
            <CharacterCard linkUrl={`/auth/choose_focus/${membershipType}/${membershipId}/${p}` } key={index} character={profile[p]} />
          </div>
        ))
      ) : (
        <Shimmer />
      )}
    </div>
  )
}
