/* eslint-disable linebreak-style */
/* eslint-disable camelcase */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

import React from 'react'
import { useSelector } from 'react-redux'
// import { React, useState, useEffect } from 'react'

// import ReactDOM from 'react-dom'
// import Route from 'react-router-dom'

// import TextField from '@material-ui/core/TextField';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import CrucibleFormFields from '../../Forms/formFields'
import { CrucibleFormFields, GambitFormFields, RaidFormFields } from '../../Forms/formFields'
import Character_Plate from '../CharacterPlate/Character_Plate'

import Card from './Card'
import ClickableCharacterList from '../CharacterSelect/ClickableCharacterList'
// import useFetch from '../../Utils/useFetch'
import FormDialog from '../../Forms/customForm'
import { ViewStore } from '../../Utils/ViewStore'

import CrucibleImage from '../../../img/cards/Crucible.png'
import GambitImage from '../../../img/cards/Gambit.png'
import RaidImage from '../../../img/cards/Raid.png'

export default function ChooseFocus(props) {
  const getFocus = useSelector((state) => state.focus)
  // console.log('State focus', getFocus)


  const focus_details = {
    Crucible: {
      focusName: 'Crucible',
      focus: 'pvp',
      description: 'Hone your skills and win glory in battle against other Guardians.',
      image: CrucibleImage,
      colours: {
        colour_1: 'var(--crucible-red)',
        colour_2: 'var(--crucible-dark-1)',
        colour_3: 'var(--crucible-dark-2)',
      },
    },
    Gambit: {
      focus: 'gambit',
      focusName: 'Gambit',
      description:
        'Defeat the enemies of humanity, collect their Motes, and bank them to summon a Primeval. First team to destroy their Primeval wins.',
      image: GambitImage,
      colours: {
        colour_1: 'var(--gambit-green)',
        colour_2: 'var(--gambit-green)',
        colour_3: 'var(--gambit-green)',
      },
    },
    Raid: {
      focus: 'raid',
      focusName: 'Raid',
      description:
        'Form a fireteam of six and brave the strange and powerful realms of our enemies.',
      image: RaidImage,
      colours: {
        colour_1: 'var(--vanguard-blue)',
        colour_2: 'var(--vanguard-dark-1)',
        colour_3: 'var(--vanguard-dark-2)',
      },
    },
  }

  const { membershipType, membershipId } = props.match.params

  return (
    <div>
      <div className='focus-header'>
        <h1>Choose a focus:</h1>
      </div>
      <div className='card-wrapper'>
        <div className='card-root-1'>
          <Card focus_details={focus_details.Crucible}>
            <FormDialog focus_details={focus_details.Crucible}>
              <CrucibleFormFields />
            </FormDialog>
          </Card>
        </div>
        <div className='card-root-2'>
          <Card focus_details={focus_details.Gambit}>
            <FormDialog focus_details={focus_details.Gambit}>
              <GambitFormFields />
            </FormDialog>
          </Card>
        </div>
        <div className='card-root-3'>
          <Card focus_details={focus_details.Raid}>
            <FormDialog focus_details={focus_details.Raid}>
              <RaidFormFields />
            </FormDialog>
          </Card>
        </div>
        {/* <div className='card-root-3'>
          <p>view store</p>
          <ViewStore {...props} />
        </div> */}
      </div>
      <h2>Choose a character:</h2>
      <ClickableCharacterList memberships={{ membershipId, membershipType }} />
      {/* <Character_Plate /> */}
    </div>
  )
}
