import React from 'react'

import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

import { CrucibleFormFields, GambitFormFields, RaidFormFields } from '../../Forms/formFields'
import FormDialog from '../../Forms/customForm'
import { getUrlDetails } from '../../Utils/HelperFunctions/index'
import { FOCUS_DETAILS } from './FocusDetails'

export default function ChooseFocusForm(props) {
  const { gameMode } = getUrlDetails()

  const useStyles = makeStyles({
    button: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      borderRadius: 5,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'var(--grey-bg)',
      width: 150,
      textAlign: 'center',
    },
  })
  const classes = useStyles()

  const getForm = () => {
    switch (gameMode) {
      case 'pvp':
      default:
        return <CrucibleFormFields />
      case 'gambit':
        return <GambitFormFields />
      case 'raid':
        return <RaidFormFields />
    }
  }

  return <FormDialog focus_details={FOCUS_DETAILS.Crucible}>{getForm()}</FormDialog>
}
