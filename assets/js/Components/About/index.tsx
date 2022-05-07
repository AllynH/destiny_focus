import React from "react";

export default function About(){
  return (
<div className="welcome-wrapper">
  <h1>I am Allyn Hunt</h1>
  <p>I am a Father, a Maker, and an Engineer, from Ireland.</p>
  <p>I built Destiny Focus as a labour of love, for the Destiny gaming and development Community.</p>
  <p>Please get in touch and say hi 🙂</p>
  <h3>Return to <a className='link-style-none' href="{{ url_for('public.home') }}" >Destiny Focus</a></h3>
</div>

  )
}
