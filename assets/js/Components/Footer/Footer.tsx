import React from 'react'
// import ReactDOM from 'react-dom';

const APP_VERSION = process.env.DF_APP_VERSION


export default function Footer() {
  return (
    <small>
      <ul className='company'>
        <li>© Allyn Hunt</li>
        <li>App version: {APP_VERSION}</li>
      </ul>

      <ul className='footer-nav'>
        <li>
          <a href="/changelog/">What{"'"}s new</a>
        </li>
        <li>
          <a href="/faq/">FAQ</a>
        </li>
        <li>
          <a href="/support/">Donate</a>
        </li>
        <li>
          <a
            href='https://github.com/AllynH/destiny_focus'
            target='_blank'
            rel='noopener noreferrer'
          >
            GitHub
          </a>
        </li>
        <li>
          <a
            href='https://github.com/AllynH/destiny_focus/issues'
            target='_blank'
            rel='noopener noreferrer'
          >
            GitHub - log issue
          </a>
        </li>
        <li>
          <a href='https://twitter.com/Allyn_H_' target='_blank' rel='noopener noreferrer'>
            Twitter
          </a>
        </li>
      </ul>
    </small>
  )
}

