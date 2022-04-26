import React from 'react'
import ManifestDataPanel from './ManifestDataPanel'
import UserDataPanel from './UserDataPanel'

import './style.css'

export default function AdminPanel() {

  return (
    <section className='admin-panel-main'>
      <ManifestDataPanel />
      <UserDataPanel />
    </section>
  )
}
