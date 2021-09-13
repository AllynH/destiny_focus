import ReactGA from 'react-ga'

export const GAFocusSetEvent = (categoryName:string, eventName:string, focusGoals:{ kdr: number}): void => {
  // console.log('GA event:', categoryName, eventName, focusGoals)
  ReactGA.event({
    category: categoryName,
    action: eventName,
    label: 'Focus Goals set',
    value: focusGoals.kdr,
    nonInteraction: false,
  })
}

export const GACharacterSelectEvent = (categoryName:string, membershipType:string, membershipId:number): void => {
  // console.log('GA event:', categoryName, membershipType, membershipId)
  ReactGA.event({
    category: categoryName,
    action: membershipType,
    label: 'Account changed',
    value: membershipId,
    nonInteraction: false,
  })
}

export const GAImageCapture = (categoryName:string, componentName:string): void => {
  // console.log('GA event:', categoryName, componentName)
  ReactGA.event({
    category: categoryName,
    action: componentName,
    label: 'Image captured',
    value: 1,
    nonInteraction: false,
  })
}
