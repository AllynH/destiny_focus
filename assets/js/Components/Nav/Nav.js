/* eslint-disable linebreak-style */
import React, { useEffect, useState } from 'react'

import { MenuList } from '@material-ui/core'

import { Link, useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'

import { GetCharacters } from '../../Utils/API/API_Requests'

// import './nav.css';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxHeight: 100,
    width: '100%',
    backgroundColor: 'var(--crucible-dark-4)',
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
  const {
    auth, membershipType, membershipId, characterId, gameMode,
  } = useParams()

  const [authFlag, setAuthFlag] = useState(false)
  const [anchorElProfile, setAnchorElProfile] = useState(null)
  const [profile, setProfile] = useState(null)
  const classes = useStyles()
  const bgClasses = useBGStyles()
  const openProfile = Boolean(anchorElProfile)

  const handleProfile = (event) => {
    console.log('Profile clicked')
    setAnchorElProfile(event.currentTarget)
  }

  const handleClose = () => {
    console.log('handleClick')
    setAnchorElProfile(null)
  }

  useEffect(() => {
    console.log('getUrlDetails: ', auth, membershipType, membershipId, characterId, gameMode)
    if (auth === 'auth') {
      setAuthFlag(true)
    }
    const fetchProfile = async (activityId) => {
      const result = await GetCharacters({
        params: {},
      })
      setProfile(result[characterId])
      // console.log('setProfile')
      // console.log(result[characterId])
    }
    fetchProfile()
  }, [auth, membershipType, membershipId, characterId, gameMode])

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
      <AppBar position='static' className='nav-bar-main'>
        <Toolbar>
          {profile &&
            <div className='icon-shimmer'></div>
          }
          <IconButton
            edge='start'
            className={`${classes.menuButton}`}
            color='inherit'
            aria-label='Destiny focus: menu'
            aria-controls='menu-appbar'
            aria-haspopup='true'
            onClick={handleProfile}
          >
            {profile ? (
              <div
                onClose={handleClose}
                open={openProfile}
                style={
                  profile
                    ? {
                      position: 'relative',
                      top: 50,
                      minHeight: 96,
                      minWidth: 96,
                      backgroundImage: `url('https://www.bungie.net/${profile.emblem_hash.icon}')`,
                      backgroundColor: 'transparent',
                      backgroundSize: 'contain',
                    }
                    : {}
                }
              ></div>
            ) : (
              <MenuIcon />
            )}
          </IconButton>
          {authFlag ? (
            <Menu
              id='menu-appbar'
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              anchorEl={anchorElProfile}
              onClose={handleClose}
              open={openProfile}
            >
              <MenuList>
                <MenuItem
                  onClick={handleClose}
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
              <MenuItem onClick={handleClose} component={Link} to={'/auth/character_select/'}>
                  Change platform
                </MenuItem>
                <MenuItem onClick={handleClose} component={Link} to={'/about/'}>
                  About Destiny-Fous
                </MenuItem>
                <MenuItem onClick={handleClose} component={Link} to={'/faq/'}>
                  FAQ
                </MenuItem>
              </MenuList>
              <MenuItem onClick={handleClose}>
                <a href='/auth/logout/'>Logout</a>
              </MenuItem>
            </Menu>
          )
        :
        <Menu
        id='menu-appbar'
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        anchorEl={anchorElProfile}
        onClose={handleClose}
        open={openProfile}
      >
        <MenuList>
              <MenuItem onClick={handleClose}>
                <a className='link-nav-home' href='/'>Destiny Focus</a>
              </MenuItem>
        </MenuList>
      </Menu>
  }

          <Typography variant='h6' className={classes.title}>
            Destiny Focus
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}
