import React, { useState, useEffect } from 'react'

import KDRChart from './KDRChart'
import Spinner from '../../Utils/Loading/Spinner'
import { GetPVPData } from '../../Utils/API/API_Requests'



export default function GetPVPCharts(props) {

  const { membershipType, membershipId } = this.props.match.params

  const [isLoaded, setLoaded] = useState(false)
  const [error, setError] = useState(null)
  const [jsonResponse, setJsonResponse] = useState([])

  const kdr = ''


  
    useEffect(() => {
    const response = GetPVPData({ params: { membershipType, membershipId } })
    setJsonResponse(response)
    const loaded = response.then((res) => 
    console.log('res', res)
    )
    if (jsonResponse) {
      console.log('jsonResonse:')
      console.log(jsonResonse)
    }

  }, [membershipId])




  const getKdr = async (jsonResponse) => {
    const kdrList = []
    const myArray = jsonResponse.Response.activities
    myArray.forEach((element, index) => {
      const kdr = element.values.killsDeathsRatio.basic.displayValue
      const deaths = element.values.deaths.basic.displayValue
      const kills = element.values.kills.basic.displayValue
      const assists = element.values.assists.basic.displayValue
      if (kills === '0' && deaths === '0') {
        return true
      }
      // console.log(`Kill / Death ratio: ${kdr}. For game: ${index}.`)
      const kdrDetails = {
        x: index + 1,
        y: parseFloat(kdr),
        deaths,
        kills,
        assists,
      }
      kdrList.push(kdrDetails)
    })
    return kdrList
  }

  const kdrData = getKdr(jsonResponse)

  return (
  <KDRChart title={'K/D Ratio'} data={kdrData} {...this.props} />
  )
}
