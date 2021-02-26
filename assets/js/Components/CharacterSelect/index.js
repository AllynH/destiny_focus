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
    console.log('useEffect!')
    const fetchCurrrentBungieAccount = async () => {
      const result = await GetCurrentBungieAccount({
        params: {},
      })
      setAccount(result.Response.destinyMemberships)
      console.log(result)
      if (result.ErrorStatus === 'Success') {
        // console.log(result.Response.destinyMemberships[0].membershipId)
        // console.log(result.Response.destinyMemberships[0].membershipType)
        setMembershipId(result.Response.destinyMemberships[0].membershipId)
        setMembershipType(result.Response.destinyMemberships[0].membershipType)
        setCharacter(result.Response.destinyMemberships[0])
      }
    }
    fetchCurrrentBungieAccount()
  }, [])

  const handlesetMembershipType = (event) => {
    const accountNo = event.currentTarget.getAttribute('valueid')
    setMembershipType(account[accountNo].membershipType)
    setMembershipId(account[accountNo].membershipId)
    setCharacter(account[accountNo])
  }

  return (
    <>
    <div className='character-select-container'>
      <div className='character-select-platform-wrap'>
        <h1>Choose a platform:</h1>

        <ul className='char-select-list'>
          {account ? (
            Object.keys(account).map((p, index) => (
              <li className='char-select-list-item' key={index}>
              <Button
                className={classes.root}
                key={index}
                onClick={handlesetMembershipType}
                valuetype={ 'accountNo' }
                valueid={ p }
              >
                {ACCOUNTTYPES[account[p].membershipType]}
              </Button>
            </li>
            ))
          ) : (
          <Shimmer />
          )}
        </ul>

      </div>

      <div className='character-select-list'>
      {
      membershipType
      && <div className='character-select-platform-wrap'>
        <h3>{ character && character.displayName } - {ACCOUNTTYPES[membershipType]}: </h3>
        <ClickableCharacterList memberships={{ membershipId, membershipType }} />
      </div>
      }
    </div>

      </div>
    </>
  )
}
