import React from "react";
import GitHubIcon from '@material-ui/icons/GitHub';
import LanguageIcon from '@material-ui/icons/Language';
import CreditCard from '@material-ui/icons/CreditCard';
import PaypalButton from "./Paypal";

import './style.css'

export default function Support() {
  console.log('In Support route!')
  console.log()
  console.log('Still in it')
  return (
    <div className="support-container liked-activity-single-wrapper">
      <div className="support-heading-wrapper">
      <div className='support-heading-wrapper' >
        <h1 className='support-heading'>Thank you for choosing to support Destiny-Focus.me</h1>
      </div>
      <div className="support-body">
        <p>Destiny-Focus is very much a labour of love, created to help the Destiny player base achieve their goals, whatever they may be.</p>
        <p>The best way to support Destiny-Focus is to get the word out and send a link to your friends, clan mates and Discord servers.</p>
        <p>As with all things in life, running this web app costs money and I{"'"}d like to keep it going for as long as possible.</p>
        <p>There are several ways to help support Destiny-Focus:</p>
      </div>

      <ul className='list-style-none support-list'>
        <li className='support-item'>Share this link: <LanguageIcon className='sponsor-icon' />
          <a className='support-link' href='https://Destiny-Focus.me' target='_blank' rel='noopener noreferrer'>Destiny-Focus.me</a>
        </li>
        <li className='support-item'>Sponsor me on GitHub: <GitHubIcon className='sponsor-icon' /> {' '}
          <a className='support-link' href='https://github.com/sponsors/AllynH' target='_blank' rel='noopener noreferrer'>
            Donate
          </a>
        </li>
        <li className='support-item'>Sponsor me on PayPal: <CreditCard className='sponsor-icon' />
        <div className='support-link'>
          <PaypalButton />
        </div>
        </li>
      </ul>

      </div>
    </div>
  )
}
