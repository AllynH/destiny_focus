import React from 'react'

import { CrucibleFormFields, GambitFormFields, RaidFormFields } from '../../Forms/formFields'
import FormDialog from '../../Forms/focusForm'
import { getUrlDetails } from '../../Utils/HelperFunctions/index'
import { FOCUS_DETAILS } from './FocusDetails'

export default function ChooseFocusForm() {
  const { gameMode } = getUrlDetails()
  // console.log('ChooseFocusForm')
  // console.log(gameMode)

  const getForm = () => {
    switch (gameMode) {
      case 'pvp':
      default:
        return { mode: 'Crucible', form: <CrucibleFormFields /> }
      case 'gambit':
        return { mode: 'Gambit', form: <GambitFormFields /> }
      case 'raid':
        return { mode: 'Raid', form: <RaidFormFields /> }
    }
  }
  const formData = getForm()
  const { mode } = formData
  const Form = formData.form

  return <FormDialog focus_details={FOCUS_DETAILS[mode]}>{Form}</FormDialog>
}
