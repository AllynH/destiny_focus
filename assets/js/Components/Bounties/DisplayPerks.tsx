import { DestinySandboxPerkDefinition } from 'bungie-api-ts/destiny2'
import React, { useEffect, useState } from 'react'
import { GetActivityDefinition } from '../../Utils/API/API_Requests'

// import './style.css'

export default function TrialsCard(props: { definitionHash: number }) {
  const [definition, setDefinition] = useState<DestinySandboxPerkDefinition>(null)
  const { definitionHash } = props

  useEffect(() => {
    const fetchProgressionsDefinition = async () => {
      const result: DestinySandboxPerkDefinition = await GetActivityDefinition({
        params: { definition: 'DestinySandboxPerkDefinition', defHash: String(definitionHash) },
      })
      setDefinition(result)
    }
    fetchProgressionsDefinition()
  }, [props])

  const iconStyle = {
    backgroundImage: `url(https://www.bungie.net${definition?.displayProperties?.icon})`,
    width: 20,
    height: 20,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
  }

  return (
    <>
      {definition && (
        <>
          <div className='bounty-perk-image' style={iconStyle}></div>
          <div className='bounty-perk-text'>{definition.displayProperties.description}</div>
        </>
      )}
    </>
  )
}
