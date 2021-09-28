/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { useParams, Link } from 'react-router-dom'
import FormDialog from '../../Forms/focusForm'

import './cards.css'
import './card.css'

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    borderRadius: 20,
    '&:hover': {
      transform: 'translateY(-3px)',
      boxShadow: '0 16px 70px -12.125px rgba(0,0,0,0.3)',
      transitionDuration: '0.8s',
      '-webkit-transition': 'transform 1.2s',
    },
  },
  media: {
    height: 140,
    backgroundSize: 'contain',
    minHeight: 300,
  },
  content: {
    minHeight: 100,
  },
  actions: {},
})

export default function MediaCard(props) {
  // This is the main card body area.
  // Props are provided from WrapCard component.
  // console.log('Card.js')
  // console.log(props.match)
  const classes = useStyles()
  const { focus, focusName, Image, colours, description } = props.focus_details
  const { membershipId, membershipType, characterId } = useParams()
  const apiUrl = `/auth/${focus}/${membershipType}/${membershipId}/${characterId}`

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <Link to={apiUrl} style={{ textDecoration: 'none' }}>
          {/* <CardMedia
            style={{ backgroundColor: colours.colour1 }}
            className={classes.media}
            src={Image}
            component='img'
            focus={focus}
          /> */}
          <div
            className={`card-media-svg ${classes.media}`}
            style={{ backgroundColor: colours.colour1 }}
          >
            <Image style={{ fill: 'white'}} height={280} width={280} />
          </div>
          <CardContent className='focus-card-action-area' style={{ backgroundColor: colours.colour2 }}>
            <div className='blank-area'></div>
            <h2 className='h2-focus-card'>{focusName}</h2>
            <p className='focus-card-description'>{description}</p>
          </CardContent>
        </Link>
      </CardActionArea>

      <CardActions style={{ backgroundColor: colours.colour1 }}>
        {/* <Link to={apiUrl} style={{ textDecoration: 'none', color: 'black' }}>
          <Typography gutterBottom variant='h5' component='h2'>
            {focus}
          </Typography>
        </Link> */}
        {props.children ? (
          props.children
        ) : (
          <FormDialog focus_details={props.focus_details}></FormDialog>
        )}
      </CardActions>
    </Card>
  )
}
