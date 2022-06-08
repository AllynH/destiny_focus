import React from 'react'

import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

import { setAccount } from '../../Redux/Actions'

import './style.css'
import { SingleCharacterInterface } from '../../Types/DestinyFocus/GetCharacter'

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 70,
    display: 'block',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
})

interface CharacterCardInterface{
  linkUrl: string,
  character: SingleCharacterInterface,
  selected: boolean,
  updateState: boolean,
}
export default function CharacterCard(props: CharacterCardInterface) {
  console.log('CharacterCard, props')
  console.log(props)
  const classes = useStyles()
  const dispatch = useDispatch()
  const { character, linkUrl, selected, updateState } = props

  // Dispatch accountReducer:
  const setCharAccount = () => {
    if(updateState) {
      const split = linkUrl.split('/')
      const data = {
        membershipType: split[3],
        membershipId: split[4],
        characterId: split[5],
      }
      dispatch(setAccount(data))
    }
  }

  const highlighted = selected ? 'selected-character' : ''

  return (
    <Card className={`character-card ${highlighted} ${classes.root}`} >
      <CardActionArea>
        <Link to={linkUrl} onClick={setCharAccount} style={{ textDecoration: 'none' }}>
          <CardMedia
            className={classes.media}
            image={`https://bungie.net${character?.emblem_hash?.secondaryIcon}`}
            title='Character Background Icon'
          />
          <CardContent>
            <Typography gutterBottom variant='h5' component='h2'>
              <div className='character-select-class-power'>
                <div>{character.destiny_class}</div>
                <div className={'character-select-power-level'}>✧{character.light}</div>
              </div>
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
