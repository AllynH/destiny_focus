/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
/* eslint-disable semi */
/* eslint-disable no-else-return */
import React, { useRef } from 'react'

// import { useFetch } from '../../Utils/useFetch'

import { exportComponentAsJPEG } from 'react-component-export-image'
import Button from '@material-ui/core/Button'
import SaveIcon from '@material-ui/icons/Save'

import './style.css'
// import DisplayAdditionalStats from './DisplayAdditionalStats'
import DisplayStats from './DisplayStats'
import Shimmer from '../../Utils/Loading/Shimmer'
import { GetStatsData, GetStatsAllTime } from '../../Utils/API/API_Requests'
import { iOS } from '../../Utils/HelperFunctions'

class AccountStats extends React.Component {
  constructor(props) {
    super(props)
    this.componentRef = React.createRef()
    this.state = {
      error: null,
      isLoaded: false,
      jsonResponse: [],
      dataStructure: {},
    }
  }

  componentDidMount() {
    this.fetchStatsData()
  }

  componentDidUpdate(pp) {
    if (this.props.season !== pp.season) {
      this.fetchStatsData()
    }
  }

  fetchStatsData = async () => {
    const { membershipType, membershipId, characterId } = this.props.match.params
    const { scope } = this.props
    const { season } = this.props
    const gameMode = 5
    // console.log('AccountStats - season test.')
    // console.log(season)

    if (scope === 'allTime') {
      const response = await GetStatsAllTime({
        params: { membershipType, membershipId, characterId },
      })
      this.setState({
        isLoaded: true,
        jsonResponse: response,
        dataStructure: this.createDataStructure(response.Response.allPvP[scope]),
      })
    } else {
      const response = await GetStatsData({
        params: {
          membershipType,
          membershipId,
          characterId,
          season,
          gameMode,
        },
      })
      console.log('GetStatsData')
      console.log(response)
      this.setState({
        isLoaded: true,
        jsonResponse: response,
        dataStructure: this.createDataStructure(response.Response.allPvP[scope]),
      })
    }
  }

  checkResponse(state) {
    const { jsonResponse, isLoaded } = state
    if (isLoaded && jsonResponse.ErrorCode > 1) {
      console.log('Caught error!')
      console.log(jsonResponse)
      this.setState({
        error: true,
        message: jsonResponse.message,
      })
    } else if (jsonResponse !== 'undefined') {
      console.log('No error found.')
      console.log(jsonResponse.ErrorCode)
      console.log(jsonResponse.message)
    } else {
      console.log(jsonResponse)
    }
  }

  createDataStructure(stats) {
    const { scope } = this.props
    const { props } = this
    const { season, seasonDescription } = this.props
    console.log(props)
    console.log(seasonDescription)
    console.log(typeof seasonDescription)

    // console.log('structure:')
    // console.log(scope, props)

    if (scope === 'allTime') {
      const structure = {
        ChartType: scope,
        allTime: {
          headerData: {
            heading: 'ALL TIME: PvP',
            title_1: 'GAMES PLAYED',
            value_1: stats.activitiesEntered.basic.displayValue || '',
            title_2: 'GAMES WON',
            value_2: stats.activitiesWon.basic.displayValue || '',
            title_3: 'TIME PLAYED',
            value_3: stats.totalActivityDurationSeconds.basic.displayValue || '',
          },
          mainData: {
            subHeading: props.subHeading,
            big_name: 'TOTAL KILLS',
            big_value: stats.kills.basic.displayValue || '',
            name_1: 'DEATHS',
            value_1: stats.deaths.basic.displayValue || '',
            name_2: 'K/D R',
            value_2: stats.killsDeathsRatio.basic.displayValue || '',
          },
          footerData: {
            title_1: 'Highest kills',
            value_1: stats.longestKillSpree?.basic?.displayValue || '',
            title_2: 'Highest precision kills',
            value_2: stats.mostPrecisionKills?.basic?.displayValue || '',
            title_3: 'Longest life',
            value_3: stats.longestSingleLife?.basic?.displayValue || '',
          },
        },
        average: {
          mainData: {
            subHeading: 'AVG. GAME STATS',
            big_name: 'AVG. GAME KILLS',
            big_value: stats.kills.pga.displayValue || '',
            name_1: 'DEATHS',
            value_1: stats.deaths.pga.displayValue || '',
            name_2: 'K/D R',
            value_2: stats.kills.pga.displayValue
              ? parseFloat(stats.kills.pga.displayValue / stats.deaths.pga.displayValue).toFixed(2)
              : 0,
          },
          footerData: {
            title_1: 'Total melee kills',
            value_1: stats.weaponKillsMelee?.basic?.displayValue || '',
            title_2: 'Total grenade kills',
            value_2: stats.weaponKillsGrenade?.basic?.displayValue || '',
            title_3: 'Total super kills',
            value_3: stats.weaponKillsSuper?.basic?.displayValue || '',
          },
        },
      }
      // console.log('structure')
      // console.log(structure)
      return structure
    } else {
      const structure = {
        ChartType: scope,
        allTime: {
          headerData: {
            heading: `Season ${season}: PvP`,
            title_1: 'GAMES PLAYED',
            value_1: stats.activitiesEntered.basic.displayValue || '',
            title_2: 'GAMES WON',
            value_2: stats.activitiesWon.basic.displayValue || '',
            title_3: 'TIME PLAYED',
            value_3: stats.totalActivityDurationSeconds.basic.displayValue || '',
          },
          mainData: {
            subHeading: props.subHeading,
            big_name: 'TOTAL KILLS',
            big_value: stats.kills.basic.displayValue || '',
            name_1: 'DEATHS',
            value_1: stats.deaths.basic.displayValue || '',
            name_2: 'K/D R',
            value_2: stats.killsDeathsRatio.basic.displayValue || '',
          },
          footerData: {
            title_1: 'Highest daily kills',
            value_1: stats.hs_kills?.pga?.displayValue || '',
            title_2: 'Highest precision kills',
            value_2: stats.hs_precisionKills?.pga?.displayValue || '',
            title_3: 'Average Lifespan',
            value_3: stats.hs_averageLifespan?.pga?.displayValue || '',
          },
        },
        average: {
          mainData: {
            subHeading: 'AVG. GAME STATS',
            big_name: 'AVG. GAME KILLS',
            big_value: stats.kills.pga.displayValue || '',
            name_1: 'DEATHS',
            value_1: stats.deaths.pga.displayValue || '',
            name_2: 'K/D R',
            value_2: stats.kills.pga.displayValue
              ? parseFloat(stats.kills.pga.displayValue / stats.deaths.pga.displayValue).toFixed(2)
              : 0,
          },
          footerData: {
            title_1: 'Efficiency',
            value_1: stats.efficiency?.basic?.displayValue || '',
            title_2: 'Total precision kills',
            value_2: stats.precisionKills?.pga?.displayValue || '',
            title_3: 'Total medals earned',
            value_3: stats.hs_totalMedalsEarned?.pga?.displayValue || '',
          },
        },
      }
      // console.log('structure')
      // console.log(structure)
      return structure
    }
  }

  render() {
    const { error, isLoaded, jsonResponse } = this.state
    if (error) {
      return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
      return <Shimmer />
    } else {
      // console.log(this.state)
      const { scope } = this.props
      const { props } = this
      const stats = jsonResponse.Response.allPvP[scope]
      const dataStruct = this.state.dataStructure
      // console.log(dataStruct)

      const DisplayHeader = (data) => (
        <>
          <div className='stats-heading'>
            <h2 className='stats-h2'>{data.heading}</h2>
          </div>
          <div className='stats-header'>
            <div className='stats-header-section header-light-right-border'>
              <p className='header-title'>
                <span>{data.title_1}&nbsp;</span>
                <span className='stats-value'>{data.value_1}</span>
              </p>
            </div>
            <div className='stats-header-section header-light-right-border'>
              <p className='header-title'>
                <span>{data.title_2}&nbsp;</span>
                <span className='stats-value'>{data.value_2}</span>
              </p>
            </div>
            <div className='stats-header-section'>
              <p className='header-title'>
                <span>{data.title_3}&nbsp;</span>
                <span className='stats-value'>{data.value_3}</span>
              </p>
            </div>
          </div>
        </>
      )

      const DisplayFooter = (data) => (
        <div className='stats-footer'>
          <div className='stats-footer-section'>
            <p className='footer-title'>
              <span>{data.title_1}&nbsp;</span>
              <span className='footer-value'>{data.value_1}</span>
            </p>
          </div>
          <div className='stats-footer-section'>
            <p className='footer-title'>
              <span>{data.title_2}&nbsp;</span>
              <span className='footer-value'>{data.value_2}</span>
            </p>
          </div>
          <div className='stats-footer-section'>
            <p className='footer-title'>
              <span>{data.title_3}&nbsp;</span>
              <span className='footer-value'>{data.value_3}</span>
            </p>
          </div>
        </div>
      )
      const takePicture = () => {
        if (iOS()) {
          window.scrollTo(0, 0)
        }
        window.scrollTo(0, 0)
        const html2CanvasOpts = {
          fileName: 'Destiny-Focus',
          html2CanvasOptions: { scrollX: 0, scrollY: -0 },
          // html2CanvasOptions: { scrollX: 0, scrollY: -window.scrollY },
        }
        exportComponentAsJPEG(this.componentRef, { ...html2CanvasOpts })
      }

      // console.log('Render AccountStats')
      // console.log(jsonResponse)
      // console.log(scope)
      // console.log(stats)
      // console.log(dataStruct)
      return (
        <div className='button-wrapper'>
          <div className='stats-full-wrapper' ref={this.componentRef}>
            <div className='stats-header-wrapper'>
              <DisplayHeader {...dataStruct.allTime.headerData} />
              <div className='stats-wrapper'>
                <div className='stats life-time-stats'>
                  <DisplayStats {...dataStruct.allTime.mainData} />
                  <DisplayFooter {...dataStruct.allTime.footerData} />
                </div>
                <div className='stats life-time-stats'>
                  <DisplayStats {...dataStruct.average.mainData} />
                  <DisplayFooter {...dataStruct.average.footerData} />
                </div>
              </div>
              <div className='site-reference'>Destiny-Focus.me</div>
            </div>
          </div>
          <Button
            variant='contained'
            color='primary'
            size='small'
            // className={classes.button}
            startIcon={<SaveIcon />}
            onClick={() => takePicture()}
          >
            Share .jpg
          </Button>
        </div>
      )
    }
  }
}

export default AccountStats
