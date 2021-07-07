/* eslint-disable linebreak-style */
/* eslint-disable camelcase */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

import React from 'react'
import { useSelector } from 'react-redux'

import { CrucibleFormFields, GambitFormFields, RaidFormFields } from '../../Forms/formFields'
import Card from './Card'
import ClickableCharacterList from '../CharacterSelect/ClickableCharacterList'
import FormDialog from '../../Forms/focusForm'
import { FOCUS_DETAILS } from '../Focus/FocusDetails'

import ItemModal from '../Item'

// import { ViewStore } from '../../Utils/ViewStore'

export default function ChooseFocus(props) {
  const getFocus = useSelector((state) => state.focus)
  // console.log('State focus', getFocus)
  const { membershipType, membershipId, characterId } = props.match.params
  Object.keys(FOCUS_DETAILS).map((f, index) => console.log('Focus: ', f))

  return (
    <div>
      <div className='focus-header'>
        <h1>Choose a focus:</h1>
      </div>
      <div className='card-wrapper'>

        {/* <div className='card-root-1'>
          <Card focus_details={FOCUS_DETAILS.Crucible}>
            <FormDialog focus_details={FOCUS_DETAILS.Crucible}>
              <CrucibleFormFields />
            </FormDialog>
          </Card>
        </div>
        <div className='card-root-2'>
          <Card focus_details={FOCUS_DETAILS.Gambit}>
            <FormDialog focus_details={FOCUS_DETAILS.Gambit}>
              <GambitFormFields />
            </FormDialog>
          </Card>
        </div>
        <div className='card-root-3'>
          <Card focus_details={FOCUS_DETAILS.Raid}>
            <FormDialog focus_details={FOCUS_DETAILS.Raid}>
              <RaidFormFields />
            </FormDialog>
          </Card>
        </div> */}

        {Object.keys(FOCUS_DETAILS).map((f, index) => (
          <div key={index} className='card-root-3'>
            <Card focus_details={FOCUS_DETAILS[f]}>
              <FormDialog focus_details={FOCUS_DETAILS[f]}>
                <RaidFormFields />
              </FormDialog>
            </Card>
          </div>
        ))}
      </div>
      <h2>Choose a character:</h2>
      <ClickableCharacterList memberships={{ membershipId, membershipType, characterId }} />
      {/* <Character_Plate /> */}
    </div>
  )
}
