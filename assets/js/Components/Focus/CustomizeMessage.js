import React from 'react'

import { CrucibleFormFields, GambitFormFields, RaidFormFields } from '../../Forms/formFields'
import FormDialog from '../../Forms/customForm'

import ChooseFocusForm from './ChooseFocusForm'
import { FOCUS_DETAILS } from './FocusDetails'

export default function CustomizeMessage() {
  return (
    <div className='focus-goals-wrapper'>
      <ChooseFocusForm />
    </div>
  )
}
