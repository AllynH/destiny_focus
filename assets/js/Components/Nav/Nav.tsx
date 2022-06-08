import React, { useEffect, useState } from 'react'

import { MenuList } from '@material-ui/core'

import { Link, useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
// import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'

import { GetCharactersWithArgs } from '../../Utils/API/API_Requests'
import { SingleCharacterInterface } from '../../Types/DestinyFocus/GetCharacter'
import CharacterHeading from './CharacterHeading'
import checkLoggedInCharacter from '../../Utils/HelperFunctions/characterSelection'
import ReturnToLoggedInUser from './ReturnToLoggedInUser'

// import './nav.css';
const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    display: 'inline-block',
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
    // marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))

const useBGStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'inline-block',
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

interface NavPropsInterface {
  membershipType: string
  membershipId: string
  characterId: string
  auth: string
  gameMode: number | string
}

export default function NavBar() {
  const { auth, membershipType, membershipId, characterId, gameMode } =
    useParams() as NavPropsInterface

  const routeAuthFlag = ((auth === 'auth' && String(gameMode).toLowerCase() !== 'character_select'))
  console.log('routeAuthFlag: ', routeAuthFlag)

  const [authFlag, setAuthFlag] = useState(false)
  const [anchorElProfile, setAnchorElProfile] = useState(null)
  const [profile, setProfile] = useState<SingleCharacterInterface>(null)
  const classes = useStyles()
  const bgClasses = useBGStyles()
  const openProfile = Boolean(anchorElProfile)

  const handleProfile = (event: React.MouseEvent<HTMLElement>) => {
    // console.log('Profile clicked')
    setAnchorElProfile(event.currentTarget)
  }

  const handleClose = () => {
    // console.log('handleClick')
    setAnchorElProfile(null)
  }

  useEffect(() => {
    const fetchProfile = async () => {
      const result = await GetCharactersWithArgs({
        params: {
          membershipId,
          membershipType,
          characterId,
        },
      })
      setProfile(result.Response[characterId])

    }
    if (routeAuthFlag) {
      setAuthFlag(true)
      fetchProfile()
    } else {
      setAuthFlag(false)
      setProfile(null)
    }
  }, [auth, membershipType, membershipId, characterId, gameMode])
  const NavIcon = (props: { profile: SingleCharacterInterface}) => (
      <div
        onClick={handleClose}
        style={{
          position: 'relative',
          top: 50,
          minHeight: 96,
          minWidth: 96,
          backgroundImage: `url('https://www.bungie.net/${props.profile.emblem_hash.icon}')`,
          backgroundColor: 'transparent',
          backgroundSize: 'contain',
        }}
      ></div>
    )
  return (
    <>
      <div className='event-banner' id='pride'></div>
      <div className='event-banner' id='ukraine'>
        <div className='ukraine-top'></div>
        <div className='ukraine-bottom'></div>
      </div>
      <div
        className={profile ? bgClasses.root : classes.root}
        style={
          profile
            ? {
                position: 'relative',
                backgroundImage: `url('https://www.bungie.net/${profile.emblem_hash.background}')`,
                backgroundColor: 'transparent',
              }
            : {}
        }
      >
        <AppBar position='static' className='nav-bar-main'>
          <Toolbar>
            {profile && <div className='icon-shimmer'></div>}
            <IconButton
              edge='start'
              className={`${classes.menuButton}`}
              color='inherit'
              aria-label='Destiny focus: menu'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleProfile}
            >
              {profile ? <NavIcon profile={profile} /> : <MenuIcon />}
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
                  <MenuItem
                    onClick={handleClose}
                    component={Link}
                    to={`/auth/likes/${membershipType}/${membershipId}/${characterId}`}
                  >
                    Likes
                  </MenuItem>
                  <MenuItem
                    onClick={handleClose}
                    component={Link}
                    to={`/auth/roster/${membershipType}/${membershipId}/${characterId}`}
                  >
                    Clan Roster
                  </MenuItem>
                  <MenuItem onClick={handleClose} component={Link} to={'/auth/character_select/'}>
                    Change platform
                  </MenuItem>
                </MenuList>
                <hr />
                <MenuList>
                  <MenuItem onClick={handleClose} component={Link} to={'/support/'}>
                    Support Destiny-Focus
                  </MenuItem>
                  <MenuItem onClick={handleClose} component={Link} to={'/changelog/'}>
                    What{"'"}s new
                  </MenuItem>
                  {/* <MenuItem onClick={handleClose} component={Link} to={'/about/'}>
                    About
                  </MenuItem> */}
                  <MenuItem onClick={handleClose} component={Link} to={'/faq/'}>
                    FAQ
                  </MenuItem>
                </MenuList>
                <MenuItem onClick={handleClose}>
                  <a href='/auth/logout/'>Logout</a>
                </MenuItem>
              </Menu>
            ) : (
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
                    <a className='link-nav-home' href='/'>
                      Destiny Focus
                    </a>
                  </MenuItem>
                  <hr />
                  <MenuItem onClick={handleClose} component={Link} to={'/support/'}>
                    Support Destiny-Focus
                  </MenuItem>
                  {/* <MenuItem onClick={handleClose} component={Link} to={'/about/'}>
                    About
                  </MenuItem> */}
                  <MenuItem onClick={handleClose} component={Link} to={'/changelog/'}>
                    What{"'"}s new
                  </MenuItem>
                  <MenuItem onClick={handleClose} component={Link} to={'/faq/'}>
                    FAQ
                  </MenuItem>
                </MenuList>
              </Menu>
            )}

            {
            profile ?
              <CharacterHeading profile={profile} loggedInUser={checkLoggedInCharacter(String(membershipType) , String(membershipId))} /> : 'Destiny Focus'
            }
            {/* <GetProgressions {...{}} /> */}
          </Toolbar>
        </AppBar>
      </div>
      { authFlag &&
        <div className='character-heading-logged-in'>
          {checkLoggedInCharacter(String(membershipType) , String(membershipId)) ? '' : <ReturnToLoggedInUser />}
        </div>
      }
      <div className='nav-spacer'></div>
    </>
  )
}
