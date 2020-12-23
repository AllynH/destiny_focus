import React, { useEffect, useState } from 'react'

import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

import Shimmer from '../../Utils/Loading/Shimmer'

import { GetProfile, GetCurrentBungieAccount } from '../../Utils/API/API_Requests'
import { ACCOUNTTYPES } from '../../Utils/HelperFunctions'
import ClickableCharacterList from './ClickableCharacterList'

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

export default function CharacterSelect() {
  const [profile, setProfile] = useState()
  const [account, setAccount] = useState()
  const [membershipType, setMembershipType] = useState()
  const [membershipId, setMembershipId] = useState()
  const [character, setCharacter] = useState()
  const classes = useStyles()

  useEffect(() => {
    const fetchCurrrentBungieAccount = async () => {
      const result = await GetCurrentBungieAccount({
        params: {},
      })
      setAccount(result.Response.destinyMemberships)
    }
    fetchCurrrentBungieAccount()
  }, [])

  const handlesetMembershipType = (event) => {
    setMembershipType(event.currentTarget.getAttribute('valuetype'))
    setMembershipId(event.currentTarget.getAttribute('valueid'))
  }

  return (
    <>
      <h1>Choose a platform:</h1>

      {account ? (
        Object.keys(account).map((p, index) => (
          <Button
            className={classes.root}
            key={index}
            onClick={handlesetMembershipType}
            valuetype={ account[p].membershipType }
            valueid={ account[p].membershipId }
          >
            {ACCOUNTTYPES[account[p].membershipType]}
          </Button>
        ))
      ) : (
        <Shimmer />
      )}
      {membershipType && <h3>Choose a character...</h3> }
      {membershipType ? <ClickableCharacterList memberships={{ membershipId, membershipType }} /> : '' }
    </>
  )
}
