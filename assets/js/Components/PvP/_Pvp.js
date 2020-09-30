/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
/* eslint-disable semi */
/* eslint-disable no-else-return */
import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';


class PvP extends React.Component {
  constructor() {
    super()
    this.getKdr = this.getKdr.bind(this)
    this.state = {
      error: null,
      isLoaded: false,
      jsonResponse: [],
    }
  }

  componentDidMount() {
    fetch('/auth/get/pvp/2/4611686018436136301/')
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            jsonResponse: result,
          })
        },
        (error) => {
          this.setState({
            isLoaded: false,
            error,
          })
        },
      )
  }

  getKdr(jsonResponse) {
    const kdrList = []
    const myArray = jsonResponse.Response.activities
    myArray.forEach((element, index) => {
      const kdr = element.values.killsDeathsRatio.basic.displayValue
      // console.log(`Kill / Death ratio: ${kdr}. For game: ${index}.`)
      const kdrDetails = { kdr, game: index + 1 }
      kdrList.push(kdrDetails)
    })
    return kdrList
  }

  getKills(jsonResponse) {
    const killsList = []
    const myArray = jsonResponse.Response.activities
    myArray.forEach((element, index) => {
      const kdr = element.values.kills.basic.displayValue
      // console.log(`Kills count: ${kdr}. For game: ${index}.`)
      const kdrDetails = { kdr, game: index + 1 }
      killsList.push(kdrDetails)
    })
    return killsList
  }

  render() {
    const { error, isLoaded, jsonResponse } = this.state
    if (error) {
      return (<div>Error: {error.message}</div>)
    } else if (!isLoaded) {
      return (<div>Loading...</div>)
    } else {
      // console.log('Render')
      // console.log(jsonResponse)
      const kdr = this.getKdr(jsonResponse)
      const kills = this.getKills(jsonResponse)
      // console.log("List of KDR details.")
      // console.log(kdr)
      // console.log("List of kills details.")
      // console.log(kills)
      return (
            <div>
                "Success"
            </div>
      )
    }
  }
}

export default PvP
