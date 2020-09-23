/* eslint-disable linebreak-style */
import React from 'react'

export default function DisplayStats(props) {
  return (

    <div>
        <h2>{props.heading}</h2>
        <div className="stats life-time-stats">
            <div className="stats circle-outer">
                <div className="stats circle">
                    <p className="stats stats-title-next-line stats-big"><span className="stats-title-next-line">{props.big_name}</span><span className="stats stats-value-next-line">{props.big_value}</span></p>
                    <p className="stats stats-title"><span>{props.name_1}&nbsp;</span><span className="stats stats-value">{props.value_1}</span></p>
                    <p className="stats stats-title"><span>{props.name_2}&nbsp;</span><span className="stats stats-value">{props.value_2}</span></p>
                </div>
            </div>
        </div>
    </div>
  )
}

