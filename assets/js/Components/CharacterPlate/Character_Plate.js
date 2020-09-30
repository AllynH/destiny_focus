/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
/* eslint-disable camelcase */
/* eslint-disable no-else-return */
/* eslint-disable semi */
/* eslint-disable eol-last */
import React from 'react'
import './style.css'

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
          this.setState({
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

  _render_object(json_response) {
    return Object.keys(json_response).map((item, i) => {
      // console.log(json_response[item])
      // console.log(json_response[item].emblem_hash.icon)
      // console.log(json_response[item].emblem_hash.background)
      const style = {
        backgroundImage: `url(${`https://www.bungie.net${json_response[item].emblem_hash.background}`})`,
      }
      const icon_style = {
        backgroundImage: `url(${`https://www.bungie.net${json_response[item].emblem_hash.icon}`})`,
      }
      const char_div = <div className="character_plate" key={i} style={style} >
                <div className="character-plate-icon" style={icon_style}></div>
                <span className="class-name">{json_response[item].destiny_class}</span> {' '}
                <span className="race-gender-name">{json_response[item].race_name} {json_response[item].gender_name}</span>
                <span className="power-level">✧{json_response[item].light}</span> {' '}
                <span className="base-level">{json_response[item].base_level}</span> {' '}
            </div>
      return (char_div)
    })
  }

  render() {
    const { error, is_loaded, json_response } = this.state
    if (error) {
      return (<div>Error: {error.message}</div>)
    } else if (!is_loaded) {
      return (<div>Loading...</div>)
    } else {
      // console.log('Render')
      // console.log(json_response)
      const contents = this._render_object(json_response)
      return (
            <div>
                {contents}
            </div>
      )
    }
  }
}

export default Character_Plate