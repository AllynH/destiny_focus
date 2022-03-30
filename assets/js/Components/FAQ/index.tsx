import React from 'react'

import { FAQ_DATA } from './faqData'

export default function FaqContent() {
  return (
    <>
      <section>
        <h1>Got some questions?</h1>
        <p>See here for frequently asked questions.</p>
        <p>
          Don{"'"}t see your question: You can contact me via GitHub or Twitter links in the footer.
        </p>
        <p>
          Found a bug: Please log a GitHub issue or send me a message on Twitter.
        </p>
      </section>
      <div className='faq-wrapper'>
        <h1>Frequently Asked Questions:</h1>
        <ol>
          {FAQ_DATA.map((f, index) => (
            <li key={index}>
              <h2>
                <a className='link-style-none' href={`#${f.Ref}`}>
                  {f.Heading}
                </a>
              </h2>
            </li>
          ))}
        </ol>
        <hr />
        <ul className='faq_list'>
          {FAQ_DATA.map((f, index) => (
            <li key={index} className='faq_list_item list-style-none'>
              <div className='faq-item'>
                <h2 id={f.Ref}>{f.Heading}</h2>
                <div className='faq-text'>
                  <p className='faq-p'>{f.Body}</p>
                </div>
                {f.Image && <div
                  className='faq-image-container'
                  style={{
                    background: f.Image,
                    height: 400,
                    maxWidth: 800,
                    backgroundPosition: 'center',
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                  }}
                ></div>}
              </div>
              <hr />
            </li>
        ))}
        </ul>
      </div>
    </>
  )
}
