
type ChangelogInterface = {
  Release: string,
  Heading: string,
  Body: Array<string>,
  Date: string,
  Ref?: string,
  Image?: string,
}

const ChangelogData: Array<ChangelogInterface> = [
  {
    Release: 'v1.16.7',
    Ref: 'User-search',
    Heading: 'v1.16.7',
    Date: '17 June, 2022',
    Body: [
      'Added a user search feature.',
      'Enter a users Bungie name and the app will find the Bungie net user, all of their linked accounts, and display their linked account characters.',
      'Clicking a users character allows you to view their Destiny-Focus profile.',
    ]
  },
  {
    Release: 'v1.16.6',
    Ref: 'Bug-fix',
    Heading: 'v1.16.6',
    Date: '08 June, 2022',
    Body: [
      'Updating types for Progressions reducer.',
    ]
  },
  {
    Release: 'v1.16.5',
    Ref: 'Bug-fix',
    Heading: 'v1.16.5',
    Date: '08 June, 2022',
    Body: [
      'Bug-fix: Removed requests to get_characters with undefined parameters.',
      'Added TypeScript to CharacterCard and ClickableCharacterList components to support bug fix.'
    ]
  },
  {
    Release: 'v1.16.4',
    Ref: 'Bug-fix',
    Heading: 'v1.16.4',
    Date: '08 June, 2022',
    Body: [
      'Bug-Fix: Fixed an issue where requests to DF API with undefined parameters were returning errors.'
    ]
  },
  {
    Release: 'v1.16.3',
    Ref: 'Bug-fix',
    Heading: 'v1.16.3',
    Date: '07 June, 2022',
    Body: [
      'Bug-Fix: Fixed an issue where activity mode was not found for Rift.'
    ]
  },
  {
    Release: 'v1.16.2',
    Ref: 'Icon-updates',
    Heading: 'v1.16.2',
    Date: '03 June, 2022',
    Body: [
      'Updated Destiny-Icons repo.',
      'Created new Platform icons to replace deleted icons.',
      'Fixed icon styling.',
      'Bug-Fix: Fixed an issue where character view icon was defaulting to Xbox platform.'
    ]
  },
  {
    Release: 'v1.16.1',
    Ref: 'Season-of-the-Haunted',
    Heading: 'v1.16.1',
    Date: '03 June, 2022',
    Body: [
      'Updated data for Season of the Haunted.',
      'Added Iron Banner progression rank.',
      'Added default colours for progression data - as Iron Banner does not have any colour details.',
      'Added pride flag banner for June, keeping Ukraine banner.'
    ]
  },
  {
    Release: 'v1.16.0',
    Ref: 'View-Clan',
    Heading: 'v1.16.0',
    Date: '16 May, 2022',
    Body: [
      'Feature: Initial commit for Clan view. View your clan details and compare yourself to your fellow guardians.',
      'Click on the Clan Roster link in the navbar to view info on your clan.',
      'Clan view shows, each clan members online status, last login date, and platform.',
      'Clicking on a clan member shows their current characters and lets you switch to viewing their account details.',
      'This paves the way for a user or clan search feature.',
    ]
  },
  {
    Release: 'v1.15.1',
    Ref: 'Change-Users',
    Heading: 'v1.15.1',
    Date: '16 May, 2022',
    Body: [
      'This release allows users to edit the number of activities they wish to view.',
      'Updated server side logic to take count as a parameter.',
      'Added a new button set interface to allow users to select their chosen value',
      'Changed the win-loss graph to only display dots for last 30 games - message is displayed for selected range.',
      'Fixed some style issues in Accounts - for better mobile support.',
    ]
  },
  {
    Release: 'v1.15.0',
    Ref: 'Change-Users',
    Heading: 'v1.15.0',
    Date: '14 May, 2022',
    Body: [
      'This release allows users to view other guardians profiles.',
      'Updated all API calls to take account details as parameters - for shared routes.',
      'Updated frontend to prevent pushing character details to Redux-store if viewing other accounts.',
      'Updated Navbar to display current character details.',
      'Added a button under the Nav to return the user to their account.',
      'Server side now sends additional data to support this, getting character details.',
    ]
  },
  {
    Release: 'v1.14.11',
    Ref: 'Bug-fixes',
    Heading: 'v1.14.7',
    Date: '9 May, 2022',
    Body: [
      'Bungie Maintenance mode returning odd errors - now reroute users to error page.',
      'Bug-fix: Account view displaying wrong text for stats.',
    ]
  },
  {
    Release: 'v1.14.9',
    Ref: 'Bug-fixes',
    Heading: 'v1.14.7',
    Date: '9 May, 2022',
    Body: [
      'Bug-fix: Precision focus goal returning K/D R goal value.',
    ]
  },
  {
    Release: 'v1.14.8',
    Ref: 'Support-route',
    Heading: 'v1.14.7',
    Date: '7 May, 2022',
    Body: [
      'Added new Support, Changelog and About pages',
      'Cleaned up some links in the footer and nav bar.',
    ]
  },
  {
    Release: 'v1.14.6',
    Ref: 'Admin-route',
    Heading: 'v1.14.6',
    Date: '26 April, 2022',
    Body: [
      'Added a new Admin route to manage database items',
    ]
  },
  {
    Release: 'v1.14.3',
    Ref: 'Bug-fixes',
    Heading: 'v1.14.3',
    Date: '19 April, 2022',
    Body: [
      'Bug fixes.',
      'Fixed GetPGCRList using focus name instead of integer',
      'Added TypeScript to more modules',
    ]
  },
  {
    Release: 'v1.14.2',
    Ref: 'Upgrades',
    Heading: 'v1.14.2',
    Date: '19 April, 2022',
    Body: [
      'Routing unauth Bungie requests directly to Bungie, bypassing DF servers.',
      'Reduced the number of internal redirects.',
      'Lots of performance related changes.',
    ]
  },
  {
    Release: 'v1.13.1',
    Ref: 'Style-fixes',
    Heading: 'v1.13.1',
    Date: '8 April, 2022',
    Body: [
      'Style changes for Likes view on mobile devices.',
    ]
  },
  {
    Release: 'v1.13.0',
    Ref: 'SVG-fixes',
    Heading: 'v1.13.0',
    Date: '8 April, 2022',
    Body: [
      'Replaced all SVGs with colour values unset.',
      'Updating node_modules.',
    ]
  },
  {
    Release: 'v1.12.0',
    Ref: 'NPM-update',
    Heading: 'v1.12.0',
    Date: '4 April, 2022',
    Body: [
      'Updating npm packages to fix vulnerabilities.',
      'This update broke SVG displays.',
    ]
  },
]

export default ChangelogData
