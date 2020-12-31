/* eslint-disable linebreak-style */
/* eslint-disable camelcase */
import React from 'react'

export default function DisplayStats(data) {

  return (
    // <div>
    //   {heading !== 'heading' ? <h2 className='stats stats-h2-main'>{heading}</h2> : ''}
    //   <div className='stats life-time-stats'>
    <>
        {/* <DisplayHeader /> */}
        <div className='stats circle-outer'>
          <div className='stats circle'>
            <p className='stats stats-title-next-line stats-big'>
              <span className='stats-title-next-line'>{data.big_name}</span>
              <span className='stats stats-value-next-line'>{data.big_value}</span>
            </p>
            <p className='stats stats-title'>
              <span>{data.name_1}&nbsp;</span>
              <span className='stats stats-value'>{data.value_1}</span>
            </p>
            <p className='stats stats-title'>
              <span>{data.name_2}&nbsp;</span>
              <span className='stats stats-value'>{data.value_2}</span>
            </p>
          </div>
        </div>
        {/* <DisplayFooter /> */}
      {/* </div>
    </div> */}
    </>
  )
}
