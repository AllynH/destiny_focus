import React from 'react'
// import ReactDOM from 'react-dom';

const APP_VERSION = Number(process.env.DF_APP_VERSION) || 'Unknown build...'


export default function Footer() {
  return (
    <small>
      <ul className='company'>
        <li>© Allyn Hunt</li>
        <li>App version: {APP_VERSION}</li>
      </ul>

      <ul className='footer-nav'>
        <li>
          <a href="{{ url_for('public.about') }}">About</a>
        </li>
        <li>
          <a href='https://github.com/sponsors/AllynH' target='_blank' rel='noopener noreferrer'>
            Donate
          </a>
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

