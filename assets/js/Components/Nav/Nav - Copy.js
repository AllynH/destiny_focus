/* eslint-disable linebreak-style */
import React from 'react'

import { NavLink, withRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import AccountCircle from '@material-ui/icons/AccountCircle'

import {
  AppBar,
  // Drawer,
  // FormControlLabel,
  // FormGroup,
  Toolbar,
  Typography,
  IconButton,
  ListItemText,
  Menu,
  MenuIcon,
  MenuList,
  MenuItem,
  Switch,
} from '@material-ui/core';

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

export default function MenuAppBar(props) {
  const classes = useStyles(props)
  // console.log("theme:" + props)
  // console.log("theme:" + props.background)
  // console.log(`url('${props.background}')`)
  const [auth, setAuth] = React.useState(true)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const handleChange = (event) => {
    setAuth(event.target.checked)
  }

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
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
              {/* <MenuList>
                {Routes.map((prop, key) => {
                  return (
                    <NavLink to={prop.path} style={{ textDecoration: 'none' }} key={key}>
                      <MenuItem selected={activeRoute(prop.path)}>
                        <ListItemText primary={prop.sidebarName} />
                      </MenuItem>
                    </NavLink>
                  )
                })}
              </MenuList> */}

              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
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
                onClick={handleMenu}
                color='inherit'
              >
                <AccountCircle />
              </IconButton>
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
