import React, { useState } from 'react'

import './style.css'
import EditIcon from '@material-ui/icons/Edit'

import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { FocusDetailParams } from '../Focus/types'
import SelectActivityIcon from '../PGCR_Splash/SelectActivityIcon'

import FocusForm from '../../Forms/FocusForm/FocusForm'
import { CharacterPropsInterface } from '../../Data/CharacterProps'

interface FlipCardsInterface {
  focusDetails: FocusDetailParams
}

/*
  Heavily inspired by:
  https://codepen.io/AbubakerSaeed/pen/EJrRvY
  https://codepen.io/kayfo23/pen/KoZOzB
 */

export default function FlipCard(props: FlipCardsInterface) {
  const { focusDetails } = props

  const params = useParams()

  const { membershipId, membershipType, characterId } = params as CharacterPropsInterface
  const focusUrl = `/auth/${focusDetails.focus}/${membershipType}/${membershipId}/${characterId}`

  const [flipCard, setFlipCard] = useState(false)

  const iconStyle: React.CSSProperties = {
    backgroundImage: `linear-gradient(to right, ${focusDetails.colours.colour1}, ${focusDetails.colours.colour2})`,
  }

  const iconBackStyle: React.CSSProperties = {
    backgroundImage: `linear-gradient(to right, ${focusDetails.colours.colour2}, ${focusDetails.colours.colour1})`,
  }

  const descriptionStyle: React.CSSProperties = {
    backgroundColor: `${focusDetails.colours.colour2}`,
  }

  const toggleFlip = () => {
    setFlipCard(!flipCard)
  }

  return (
    <div className={`flip-card-container ${flipCard ? ' flipped' : ''}`}>
      <div className='flip-card'>

        {/* Card front: */}
        <div className='card-front' style={iconStyle}>
          <div className='flip-card-icon-title-wrap'>
            <div className='flip-card-icon'>
              <Link to={focusUrl} style={{ textDecoration: 'none' }}>
                <SelectActivityIcon activityMode={focusDetails.focus} iconStyle={'cardIcon'} />
              </Link>
            </div>
            <div className='flip-card-title-description-wrap' style={descriptionStyle}>
              <div className='flip-card-title div-shimmer' onClick={toggleFlip} style={descriptionStyle}>
                <div className='flip-card-title-icon-wrap'>
                  <h2 className='h2-focus-card'>{focusDetails.activityName}</h2>
                  <EditIcon className='flip-card-edit-icon' />
                </div>
              </div>
              <p className='focus-card-description'>{focusDetails.description}</p>
            </div>
          </div>
        </div>

        {/* Card back: */}
        <div className='card-back' style={iconBackStyle}>
          <div className='flip-card-back-icon-content-wrap'>
            <div className='flip-card-back-icon' onClick={toggleFlip}>
              <SelectActivityIcon activityMode={focusDetails.focus} iconStyle={'cardSmallIcon'} />
            </div>

            <div className='flip-card-back-form-wrap'>
              <div className='flip-card-back-form-title'>
                {/* <h3 className='no-margin'>Set focus goals:</h3> */}
              </div>
              <FocusForm focus={focusDetails.focus} focusUrl={focusUrl} />
            </div>
            <div
              className='flip-card-back-icon flip-card-vertical-horizontal-transform'
              onClick={toggleFlip}
            >
              <SelectActivityIcon activityMode={focusDetails.focus} iconStyle={'cardSmallIcon'} />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
