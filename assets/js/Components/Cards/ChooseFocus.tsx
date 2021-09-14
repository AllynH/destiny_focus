
import React from 'react'

import { RaidFormFields } from '../../Forms/formFields'
import Card from './Card'
import ClickableCharacterList from '../CharacterSelect/ClickableCharacterList'
import FormDialog from '../../Forms/focusForm'
import { FOCUS_DETAILS } from '../Focus/FocusDetails'
import { FocusDetailKey } from '../Focus/types'
import { CharacterPropsInterface } from '../../Data/CharacterProps'

interface ChooseFocusInterface {
  match: { params: CharacterPropsInterface }
}

export default function ChooseFocus(props: ChooseFocusInterface) {
  const { membershipType , membershipId, characterId } = props.match.params as CharacterPropsInterface

  return (
    <div>
      <div className='focus-header'>
        <h1>Choose a focus:</h1>
      </div>
      <div className='card-wrapper'>

        {Object.keys(FOCUS_DETAILS).map((f: FocusDetailKey, index: number) => (
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
