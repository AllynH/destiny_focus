import React from 'react'

import { Link } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
})

export default function CharacterCard(props) {
  const classes = useStyles()
  console.log('CharacterCard')
  console.log(props)
  const { character, linkUrl } = props
  console.log('destructured props', character, linkUrl)
  console.log('linkUrl', linkUrl)
  console.log(typeof(linkUrl))

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <Link to={linkUrl} style={{ textDecoration: 'none' }}>
          <CardMedia
            className={classes.media}
            image={`https://bungie.net${character.emblem_hash.background}`}
            title='Character Background Icon'
          />
          <CardContent>
            <Typography gutterBottom variant='h5' component='h2'>
              {character.destiny_class}
            </Typography>
            <Typography variant='body2' color='textSecondary' component='p'>
              {character.race_name} {character.gender_name}
            </Typography>
          </CardContent>
        </Link>
      </CardActionArea>
    </Card>
  )
}
