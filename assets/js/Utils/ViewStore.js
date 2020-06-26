import React from 'react';
import { useSelector } from 'react-redux'

export const ViewStore = () => {
  console.log('ViewStore')
  const state = useSelector((state) => state)
  const focus = useSelector((state) => state.focus)
  console.log(state)
  console.log(focus)
  return (
      <div>
        <p>Focus:{focus}</p>
      </div>
  )
}
