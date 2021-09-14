import React from 'react'

import { CrucibleFormFields, GambitFormFields, RaidFormFields } from '../../Forms/formFields'
import FormDialog from '../../Forms/focusForm'
import { getUrlDetails } from '../../Utils/HelperFunctions/index'
import { FOCUS_DETAILS } from './FocusDetails'
import { FocusDetailKey } from './types'

export default function ChooseFocusForm() {
  const { gameMode } = getUrlDetails()

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

  // Cast to an Array of FocusDetailKeys[] as .filter returns an array - hopefully with only 1 item filteredActivityKeys[0]
  const filteredActivityKeys: FocusDetailKey[]
    = Object.keys(FOCUS_DETAILS)
    .filter((key: FocusDetailKey) => FOCUS_DETAILS[key].focus === gameMode) as FocusDetailKey[]

  const formData = getForm()
  const Form = formData.form

  return <FormDialog focus_details={FOCUS_DETAILS[filteredActivityKeys[0]]}>{Form}</FormDialog>
}
