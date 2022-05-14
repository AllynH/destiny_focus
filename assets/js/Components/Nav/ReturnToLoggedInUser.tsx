import React from "react"

import { Link } from "react-router-dom"
import HomeIcon from '@material-ui/icons/Home'

import AdventureIcon from '../../../destiny-icons/explore/meditations.svg'
import { getLoggedInUserUrl } from "../../Utils/HelperFunctions/characterSelection"

export default function ReturnToLoggedInUser() {
  const url = getLoggedInUserUrl()

  return (
    <div className='character-heading-home-icon-wrap expand-on-hover'>
      <p className='character-heading-home-message'>Return to logged in character</p>
    <Link to={url} style={{ textDecoration: 'none', color: 'inherit' }}>
      <AdventureIcon
              width={40}
              height={40}
              viewBox={'0 0 32 32'}
              style={{
                fill: 'white',
                zIndex: 1,
                filter: 'drop-shadow( 3px 3px 5px rgba(0, 0, 0, .8))',
              }}
      className='character-heading-home-icon' />
    </Link>
    </div>
  )
}
