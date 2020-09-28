/* eslint-disable linebreak-style */
/* eslint-disable camelcase */
import React from 'react'

export default function DisplayStats({
  heading = 'Heading',
  big_name = 'big_name',
  big_value = '0',
  name_1 = 'name_1',
  value_1 = '0',
  name_2 = 'name_2',
  value_2 = '0',
}) {
  return (

    <div>
        <h2>{heading}</h2>
        <div className="stats life-time-stats">
            <div className="stats circle-outer">
                <div className="stats circle">
                    <p className="stats stats-title-next-line stats-big">
                      <span className="stats-title-next-line">{big_name}</span><span className="stats stats-value-next-line">{big_value}</span>
                    </p>
                    <p className="stats stats-title">
                      <span>{name_1}&nbsp;</span><span className="stats stats-value">{value_1}</span>
                    </p>
                    <p className="stats stats-title">
                      <span>{name_2}&nbsp;</span><span className="stats stats-value">{value_2}</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}