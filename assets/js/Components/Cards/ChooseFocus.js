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
// import useFetch from '../../Utils/useFetch'
import FormDialog from '../../Forms/customForm'
import { ViewStore } from '../../Utils/ViewStore'

import CrucibleImage from '../../../img/cards/Crucible.png'
import GambitImage from '../../../img/cards/Gambit.png'
import RaidImage from '../../../img/cards/Raid.png'

export default function ChooseFocus(props) {
  const getFocus = useSelector((state) => state.focus)
  console.log('State focus', getFocus)

  function CrucibleText() {
    return (
      <DialogContent>
        <DialogContentText>
          What would you like to focus on today? Customize your focus goals.
        </DialogContentText>
        <TextField
          autoFocus
          margin='dense'
          id='kdr'
          placeholder='1.5'
          label='Kill Death Ratio'
          type='int'
          fullWidth
        />
        <TextField
          margin='dense'
          id='wlr'
          placeholder='75'
          label='Win Loss Ratio (percent)'
          type='email'
          fullWidth
        />
        <TextField
          margin='dense'
          id='psl'
          placeholder='50'
          label='Precision Kills per game'
          type='email'
          fullWidth
        />
      </DialogContent>
    )
  }

  const focus_details = {
    Crucible: {
      form: CrucibleText,
      focusName: 'Crucible',
      focus: 'pvp',
      description: 'Hone your skills and win glory in battle against other Guardians.',
      image: CrucibleImage,
      apiUrl: `/auth/pvp/${props.match.params.membershipType}/${props.match.params.membershipId}/${props.match.params.characterId}`,
      colours: {
        colour_1: 'var(--crucible-red)',
        colour_2: 'var(--crucible-dark-1)',
        colour_3: 'var(--crucible-dark-2)',
      },
      stats: {
        kdr: {
          apiUrl: `/auth/get/pvp/${props.match.params.membershipType}/${props.match.params.membershipId}/${props.match.params.characterId}`,
        },
        allTime: {
          apiUrl: `/auth/get/historical_stats_alltime/${props.match.params.membershipType}/${props.match.params.membershipId}/${props.match.params.characterId}`,
        },
        season: {
          apiUrl: `/auth/get/historical_stats_alltime/${props.match.params.membershipType}/${props.match.params.membershipId}/${props.match.params.characterId}`,
        },
      },
    },
    Gambit: {
      focus: 'gambit',
      focusName: 'Gambit',
      description:
        'Defeat the enemies of humanity, collect their Motes, and bank them to summon a Primeval. First team to destroy their Primeval wins.',
      image: GambitImage,
      apiUrl: `/auth/gambit/${props.match.params.membershipType}/${props.match.params.membershipId}/${props.match.params.characterId}`,
      colours: {
        colour_1: 'forestgreen',
        colour_2: 'forestgreen',
        colour_3: 'forestgreen',
      },
    },
    Raid: {
      focus: 'raid',
      focusName: 'Raid',
      description:
        'Form a fireteam of six and brave the strange and powerful realms of our enemies.',
      image: RaidImage,
      apiUrl: `/auth/raid/${props.match.params.membershipType}/${props.match.params.membershipId}/${props.match.params.characterId}`,
      colours: {
        colour_1: 'var(--vanguard-blue)',
        colour_2: 'var(--vanguard-dark-1)',
        colour_3: 'var(--vanguard-dark-2)',
      },
    },
  }
  // console.log('focus_details')
  // console.log(focus_details)
  // console.log('Testing props')
  // console.log(props)
  // console.log(props.match.params)

  const { membershipType, membershipId } = props.match.params
  // const apiUrl = `/auth/get/pvp/${membershipType}/${membershipId}`

  // const { data, error, loading } = useFetch(apiUrl)
  // console.log('Finished useFetch:')
  // console.log(error)
  // console.log(loading)
  console.log('Crucible Form Data:', CrucibleFormFields)

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
        <div className='card-root-3'>
          <p>view store</p>
          <ViewStore {...props} />
        </div>
      </div>
      <Character_Plate />
    </div>
  )
}
