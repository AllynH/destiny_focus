/* eslint-disable linebreak-style */
// import React from 'react'

// import { makeStyles } from '@material-ui/core/styles'
// import AccountCircle from '@material-ui/icons/AccountCircle'

import {
  //   AppBar,
  //   // Drawer,
  //   // FormControlLabel,
  //   // FormGroup,
  //   Toolbar,
  //   Typography,
  //   IconButton,
  ListItemText,
  //   Menu,
  //   MenuIcon,
  //   MenuItem,
  MenuList,
  //   Switch,
} from '@material-ui/core'

import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'

import { GetProfile } from '../../Utils/API/API_Requests'
import { getUrlDetails } from '../../Utils/HelperFunctions'

// import './nav.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxHeight: 100,
    width: '100%',
    backgroundPosition: '-52px bottom',
    backgroundSize: 'cover',
    '& .MuiAppBar-colorPrimary': {},
    '& .MuiPaper-root': {
      maxHeight: 100,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))

const useBGStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxHeight: 100,
    width: '100%',
    backgroundPosition: '-52px bottom',
    backgroundSize: 'cover',
    '& .MuiAppBar-colorPrimary': {
      backgroundColor: 'transparent',
    },
    '& .MuiPaper-root': {
      maxHeight: 100,
      backgroundColor: 'transparent',
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))

export default function NavBar() {
  const [loaded, setLoaded] = useState(false)

  const [authFlag, setAuthFlag] = useState(false)
  // const [anchorEl, setAnchorEl] = useState(null)
  const [anchorElProfile, setAnchorElProfile] = useState(null)
  const [profile, setProfile] = useState(null)
  const classes = useStyles()
  const bgClasses = useBGStyles()
  const openProfile = Boolean(anchorElProfile)

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const { auth, membershipType, membershipId, characterId, gameMode } = getUrlDetails()

  useEffect(() => {
    // console.log('getUrlDetails: ', auth, membershipType, membershipId, characterId, gameMode)

    if (auth === 'auth') {
      setAuthFlag(true)
    }

    const fetchProfile = async (activityId) => {
      const result = await GetProfile({
        params: {},
      })
      setProfile(result[characterId])
      // console.log('setProfile')
      // console.log(result[characterId])
    }
    fetchProfile()
  }, [membershipId])

  const handleMenu = (event) => {
    console.log('Menu clicked')
    setAnchorEl(event.currentTarget)
  }

  const handleProfile = (event) => {
    console.log('Profile clicked')
    setAnchorElProfile(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
    setAnchorElProfile(null)
    console.log('Closing menues.', anchorEl, open)
    console.log('Profile.', anchorElProfile, open)
  }

  return (
    <div
      className={profile ? bgClasses.root : classes.root}
      style={
        profile
          ? {
              position: 'relative,',
              backgroundImage: `url('https://www.bungie.net/${profile.emblem_hash.background}')`,
              backgroundColor: 'transparent',
            }
          : {}
      }
    >
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
            aria-controls='menu-appbar'
            aria-haspopup='true'
            onClick={handleMenu}
          >
            {profile ? (
              <div
                style={
                  profile
                    ? {
                        position: 'relative',
                        top: 30,
                        minHeight: 90,
                        minWidth: 90,
                        backgroundImage: `url('https://www.bungie.net/${profile.emblem_hash.icon}')`,
                        backgroundColor: 'transparent',
                      }
                    : {}
                }
              ></div>
            ) : (
              <MenuIcon />
            )}

            {authFlag && (
              <Menu
                id='menu-appbar'
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuList>
                  <MenuItem
                    onClick={handleClose}
                    open={open}
                    component={Link}
                    to={`/auth/account/${membershipType}/${membershipId}/${characterId}`}
                  >
                    Account stats
                  </MenuItem>
                  <MenuItem
                    onClick={handleClose}
                    component={Link}
                    to={`/auth/choose_focus/${membershipType}/${membershipId}/${characterId}`}
                  >
                    Choose Focus
                  </MenuItem>
                </MenuList>
                <hr />
                <MenuList>
                  <MenuItem
                    onClick={handleClose}
                    open={open}
                    component={Link}
                    to={'/auth/character_select/'}
                  >
                    Character select
                  </MenuItem>
                </MenuList>
              </Menu>
            )}
          </IconButton>

          <Typography variant='h6' className={classes.title}>
            Destiny Focus
          </Typography>
          {authFlag && (
            <div>
              <IconButton
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleProfile}
                color='inherit'
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id='menu-profile'
                anchorEl={anchorElProfile}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={openProfile}
                onClose={handleClose}
              >
                {/* <MenuItem onClick={handleClose} component={Link} to={'/logout'}>
                  Logout */}
                  {/* React router needs an API call to /logout */}
                <MenuItem onClick={handleClose}>
                  <a href='/auth/logout/'>Logout</a>
                </MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}
