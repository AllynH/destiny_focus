import React, { useEffect } from 'react'

import { useLocation } from 'react-router-dom'
import ReactGA from 'react-ga'

function removeUserDetailsFromPath(location) {
  const [dummy, auth, mode, membershipType, membershipId, characterId] = location.pathname.split('/')
  const newPath = `/${auth}/${mode}/${location.search}`

  return newPath
}

function logPageView(location) {
  const page = location.pathname + location.search
  // console.log('ReactGA.set')
  // console.log(page)
  // console.log(`${window.location.origin}${page}`)
  ReactGA.set({
    page,
    location: `${window.location.origin}${page}`,
    appName: 'Destiny-Focus',
    appVersion: 'v1.0.0',
  })
  ReactGA.pageview(removeUserDetailsFromPath(location))
}

export default function GoogleAnalytics() {
  const location = useLocation()

  useEffect(() => {
    const debugFlag = process.env.NODE_ENV === 'development'
    // console.log(process.env.GOOGLE_ANALYTICS_ID)
    // console.log(debugFlag)
    ReactGA.initialize(process.env.GOOGLE_ANALYTICS_ID, { debug: debugFlag })
  }, [])

  useEffect(() => {
    logPageView(location)
  }, [location.pathname, location.search])

  return null
}
