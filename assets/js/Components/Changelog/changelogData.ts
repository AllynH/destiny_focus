
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
