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
} from '@material-ui/core';


import React from 'react';
import {
  NavLink, withRouter, useRouteMatch, useParams, useHistory, useLocation,
} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';


import Routes from '../Routes'

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

function NavBar(props) {
  const classes = useStyles(props)
  const { slug } = useParams();
  const { history } = useHistory();
  const { location } = useLocation();


  console.log('slug')
  console.log(slug)

  console.log('history')
  console.log(history)

  console.log('location')
  console.log(location)

  // const { membershipType, membershipId, characterId } = this.props.match.params

  // console.log(membershipType, membershipId, characterId)

  // console.log("theme:" + props)
  // console.log("theme:" + props.background)
  // console.log(`url('${props.background}')`)
  const [loaded, setLoaded] = React.useState(false)

  const [anchorEl, setAnchorEl] = React.useState(null)
  const [auth, setAuth] = React.useState(false)
  const [anchorElProfile, setAnchorElProfile] = React.useState(null)
  const open = Boolean(anchorEl)
  const openProfile = Boolean(anchorElProfile)

  if (window.location.href.includes('/auth/') && !loaded) {
    setAuth(true)
    setLoaded(true)
    const { url } = useRouteMatch('/auth/:focus/:membershipType([1|2|3|4|5])/:membershipId([0-9]+)/:characterId([0-9]+)/');
    const { membershipType, membershipId, characterId } = url
    console.log('url')
    console.log(url)
    console.log(membershipType, membershipId, characterId)
  }

  const handleChange = (event) => {
    setAuth(event.target.checked)
  }

  const handleMenu = (event) => {
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

  const activeRoute = (routeName) => props.location.pathname === routeName

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
            <Menu
              id='menu-appbar'
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
              open={open}
              onClose={handleClose}
            >
              <MenuList>
                {Routes.map((prop, key) => (
                    <NavLink to={prop.path} style={{ textDecoration: 'none' }} key={key}>
                      <MenuItem selected={activeRoute(prop.path)}>
                        <ListItemText primary={prop.sidebarName} />
                      </MenuItem>
                    </NavLink>
                ))}
              </MenuList>

            </Menu>
          </IconButton>

          <Typography variant='h6' className={classes.title}>
            Destiny Focus
          </Typography>
          {auth && (
            <div>
              <IconButton
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleProfile}
                color='inherit'
                onClose={handleClose}
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id='menu-profile'
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
                open={openProfile}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}
export default withRouter(NavBar)
