/* eslint-disable class-methods-use-this */
/* eslint-disable camelcase */
/* eslint-disable no-else-return */
/* eslint-disable linebreak-style */
/* eslint-disable semi */
/* eslint-disable eol-last */
import React from 'react'

class Character_Plate extends React.Component {
  constructor() {
    super()
    this.state = {
      error: null,
      is_loaded: false,
      json_response: [],
    }
  }

  componentDidMount() {
    fetch('/auth/get_profile')
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState( {
            is_loaded: true,
            json_response: result,
          })
        },
        (error) => {
          this.setState({
            is_loaded: false,
            error,
          })
        },
      )
  }

  _render_object(character_data) {
    return Object.keys(character_data).map((item, i) => {
      console.log('Inside _render_object')
      console.log(i)
      console.log(item)
      console.log(character_data[item].emblemPath)
      console.log(character_data[item].emblemBackgroundPath)
      const style = {
        width: '100%',
        height: '140px',
        backgroundImage: `url(${`https://www.bungie.net${character_data[item].emblemBackgroundPath}`})`,
      }
      const char_div = <div key={i} style={style} >
          {character_data[item].raceHash} {character_data[item].raceHash} {character_data[item].classHash}
      </div>
      return (char_div)
    })
  }

  render() {
    const {error, is_loaded, json_response} = this.state
    if (error) {
      return (<div>Error: {error.message}</div>)
    } else if (!is_loaded) {
      return (<div>Loading...</div>)
    } else {
      console.log('Render')
      console.log(json_response)
      const contents = this._render_object(json_response.Response.characters.data)
      return (
            <div>
                {contents}
            </div>
      )
    }
  }
}

export default Character_Plate