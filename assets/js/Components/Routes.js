import ChooseFocus from './Cards/ChooseFocus'
import PvPChart from './PvP/PVPCharts'
import AccountStats from './AccountStats/AccountStats'
import Welcome from './Welcome/Welcome'

const Routes = [
  {
    path: '/',
    sidebarName: 'Home',
    component: Welcome,
  },
  {
    path: '/auth/choose_focus/:membershipType([1|2|3|4|5])/:membershipId([0-9]+)/:characterId([0-9]+)/',
    sidebarName: 'Choose Focus',
    component: ChooseFocus,
  },
  {
    path: '/auth/pvp/:membershipType([1|2|3|4|5])/:membershipId([0-9]+)/:characterId([0-9]+)/',
    sidebarName: 'Focus: PvP',
    component: PvPChart,
  },
  {
    path: '/auth/gambit/:membershipType([1|2|3|4|5])/:membershipId([0-9]+)/:characterId([0-9]+)/',
    sidebarName: 'Focus: Gambit',
    component: PvPChart,
  },
  {
    path: '/auth/raid/:membershipType([1|2|3|4|5])/:membershipId([0-9]+)/:characterId([0-9]+)/',
    sidebarName: 'Focus: Raid',
    component: PvPChart,
  },
  {
    path: '/auth/account/:membershipType([1|2|3|4|5])/:membershipId([0-9]+)/:characterId([0-9]+)/',
    sidebarName: 'Account Stats',
    component: AccountStats,
  },
]

export default Routes
