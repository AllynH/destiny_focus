import OpenPgcrImage from '../../../img/FAQ/Destiny-Focus_open_PGCR.png'
import SharePgcrImage from '../../../img/FAQ/Destiny-Focus_PGCR_share.png'
import ViewPgcrImage from '../../../img/FAQ/Destiny-Focus_PGCR_view.png'

export const FAQ_DATA = [
  {
    Ref: 'Open-PGCR',
    Heading: 'How do I see more information on a recent match?',
    Body:
      'From the Focus view, click on the arrow to open any match in fullscreen. This link is also shareable with your non-Guardian friends.',
    Image: `url(${OpenPgcrImage})`,
  },
  {
    Ref: 'View-PGCR',
    Heading: 'Can I see what weapons I (or my opponent) used for a match?',
    Body:
      'You can see a full breakdown of your kills and interesting stats from the PGCR view.',
    Image: `url(${ViewPgcrImage})`,
  },
  {
    Ref: 'Share-PGCR',
    Heading: 'Can I share my favorite games with my friends or clan members?',
    Body:
      'You can share the URL from the PGCR view. Anyone can view this link - no login required :)',
    Image: `url(${SharePgcrImage})`,
  },
  {
    Ref: 'Edit-Focus',
    Heading: 'How do I edit my Focus goals?',
    Body:
      'For now refresh the page and they\'ll clear. I\'m working on a fix to make it easier to edit these goals - hold tight Guardian.',
  },
]
