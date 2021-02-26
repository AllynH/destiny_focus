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

  const TEST = {
    ErrorCode: 1,
    ErrorStatus: 'Success',
    Message: 'Ok',
    MessageData: {},
    Response: {
      bungieNetUser: {
        about: '',
        blizzardDisplayName: '',
        context: {
          ignoreStatus: {
            ignoreFlags: 0,
            isIgnored: false,
          },
          isFollowing: false,
        },
        displayName: 'ChimpAhoy',
        firstAccess: '2014-09-22T08:50:18.414Z',
        isDeleted: false,
        lastUpdate: '2019-04-08T21:52:47.896Z',
        locale: 'en',
        localeInheritDefault: true,
        membershipId: '7285106',
        profilePicture: 70548,
        profilePicturePath: '/img/profile/avatars/avatar2.jpg',
        profileTheme: 101,
        profileThemeName: 'd2cover',
        psnDisplayName: 'ChimpAhoy',
        showActivity: true,
        showGroupMessaging: true,
        statusDate: '2015-10-20T09:38:17.751Z',
        statusText: 'Hail to the Chimp!',
        successMessageFlags: '0',
        uniqueName: '7285106',
        userTitle: 0,
        userTitleDisplay: 'Newbie',
      },
      destinyMemberships: [
        {
          applicableMembershipTypes: [
            2,
          ],
          crossSaveOverride: 0,
          displayName: 'ChimpAhoy',
          isPublic: true,
          membershipId: '4611686018436136301',
          membershipType: 2,
        },
        {
          applicableMembershipTypes: [
            2,
          ],
          crossSaveOverride: 0,
          displayName: 'ChimpyBoy',
          isPublic: true,
          membershipId: '4611686018436136301',
          membershipType: 4,
        },
      ],
      membershipOverrides: {},
    },
    ThrottleSeconds: 0,
  }

  useEffect(() => {
    console.log('useEffect!')
    const fetchCurrrentBungieAccount = async () => {
      const result = await GetCurrentBungieAccount({
        params: {},
      })
      setAccount(TEST.Response.destinyMemberships)
      console.log(TEST)
      if (TEST.ErrorStatus === 'Success') {
        // console.log(TEST.Response.destinyMemberships[0].membershipId)
        // console.log(TEST.Response.destinyMemberships[0].membershipType)
        setMembershipId(TEST.Response.destinyMemberships[0].membershipId)
        setMembershipType(TEST.Response.destinyMemberships[0].membershipType)
      }
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
      {membershipType && <h3>Choose a character: {ACCOUNTTYPES[membershipType]}</h3> }
      {membershipType ? <ClickableCharacterList memberships={{ membershipId, membershipType }} /> : '' }
    </>
  )
}
