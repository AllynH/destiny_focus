import React from 'react'

import ReactTooltip from 'react-tooltip'

import TLW from '../../../../bungie_response/items/TheLastWord'

const returnTier = (tier) => tier.toLowerCase()

export default function ItemModal(props) {
  const { itemName, itemJson } = props

  console.log('ItemModal')
  console.log(props)
  // console.log(TLW)
  // console.log(returnTier(TLW.inventory.tierTypeName))

  return (
  <div className='item-modal'>
    <Body {...props} />
    <Header {...props} />
  </div>
  )
}

const Header = (props) => {
  const {
    displayProperties, itemTypeDisplayName, itemTypeAndTierDisplayName, flavorText, inventory,
  } = props
  const tier = returnTier(props.inventory.tierTypeName)

  return (
    <div className='position relative'>
      <div className={`item-header-wrapper ${tier}`}>
        <h2 className='item-header-name'>{displayProperties.name}</h2>
        <div className='item-header-name-tier-wrapper'>
        <div className='item-body-display-tier'>{itemTypeAndTierDisplayName}</div>
        </div>
      </div>
    </div>
  )
}

const Body = (props) => {
  const {
    displayProperties, itemTypeDisplayName, itemTypeAndTierDisplayName, flavorText, screenshot,
  } = props
  const iconStyle = {
    backgroundImage: `url(${`https://www.bungie.net${screenshot}`})`,
  }


  return (
    <div>
      <div className='item-body-wrapper background-image' style={iconStyle}>
        {/* <div className='item-body-name'>{itemTypeDisplayName}</div> */}
        <div className='item-body-description'>{flavorText}</div>
      </div>
    </div>
  )
}
