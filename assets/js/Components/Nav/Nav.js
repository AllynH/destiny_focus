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

import {
  Link,
  NavLink,
  withRouter,
  useRouteMatch,
  useParams,
  useHistory,
  useLocation,
} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'

import Routes from '../Routes'
import { getUrlDetails } from '../../Utils/HelperFunctions'

// import './nav.css';

const useStyles = makeStyles((theme, props) => ({
  root: {
    flexGrow: 1,
    // backgroundImage: `url('https://www.bungie.net/common/destiny2_content/icons/f89f81b46cdbb7d07f7bddad12eebf35.jpg')`,
    // backgroundImage: (props) => props.background,
    // backgroundImage: `url(${props.background})`,
    width: '100%',
    backgroundPosition: '-52px bottom',
    backgroundSize: 'cover',
    '& .MuiAppBar-colorPrimary': {
      // backgroundImage: `url(${props.background})`,
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
  const classes = useStyles()

  const [loaded, setLoaded] = useState(false)

  const [authFlag, setAuthFlag] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [anchorElProfile, setAnchorElProfile] = useState(null)
  // const [open, setOpen] = useState(false)
  const open = Boolean(anchorEl)
  const openProfile = Boolean(anchorElProfile)

  const { auth, membershipType, membershipId, characterId, gameMode } = getUrlDetails()

  useEffect(() => {
    console.log('getUrlDetails: ', auth, membershipType, membershipId, characterId, gameMode)

    if (auth === 'auth') {
      setAuthFlag(true)
      setLoaded(true)
    }
  })

  const handleChange = (event) => {
    setAuthFlag(event.target.checked)
  }

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
  }

  // const activeRoute = (routeName) => props.location.pathname === routeName

  return (
    <div className={classes.root}>
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
            <MenuIcon />
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
                  vertical: 'top',
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
                  {/* Don't select items that depend on props: */}
                  {/* <MenuItem
                  component={Link}
                  to={`/auth/pvp/${membershipType}/${membershipId}/${characterId}`}
                >
                  Focus PvP
                </MenuItem>
                <MenuItem
                  component={Link}
                  to={`/auth/gambit/${membershipType}/${membershipId}/${characterId}`}
                >
                  Focus Gambit
                </MenuItem>
                <MenuItem
                  component={Link}
                  to={`/auth/raid/${membershipType}/${membershipId}/${characterId}`}
                >
                  Focus Raid
                </MenuItem> */}
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
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem
                  onClick={handleClose}
                  // component={Link}
                  // to={'/auth/logout/'}
                >
                  <a href="/auth/logout/">Logout</a>
                </MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}
