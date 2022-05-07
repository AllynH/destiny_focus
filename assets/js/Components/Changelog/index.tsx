import React from 'react'

import ChangelogData from './changelogData'

export default function Changelog() {
  return (
    <section>
      <div className='faq-wrapper'>
        <h1>Changelog:</h1>
        <ul className='faq_list'>
          {ChangelogData.map((c, index) => (
            <li key={index} className='faq_list_item list-style-none'>
              <div className='faq-item'>
                <h2 id={c.Ref}>{c.Heading}: {c.Date}</h2>
                <div className='faq-text'>
                  { c.Body.map((i, innerIndex) => (
                    <p key={innerIndex} className='faq-p'>{i}</p>
                  )) }
                </div>
                {c.Image && (
                  <div
                    className='faq-image-container'
                    style={{
                      background: c.Image,
                      height: 400,
                      maxWidth: 800,
                      backgroundPosition: 'center',
                      backgroundSize: 'contain',
                      backgroundRepeat: 'no-repeat',
                    }}
                  ></div>
                )}
              </div>
              <hr />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
