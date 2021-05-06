import React from 'react'

import { Link } from 'react-router-dom'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

export default function ReturnToFocusButton(props) {
  const {
    pathname,
  } = props

  return (
    <Link
      to={{
        pathname,
      }}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <div className='return-to-focus-button div-shimmer'><ArrowBackIosIcon />Return to Focus</div>
    </Link>
  )
}
