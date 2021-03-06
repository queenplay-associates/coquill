import React from 'react'
import { Link } from 'react-router-dom';

const logo = 'https://img00.deviantart.net/3b69/i/2015/125/6/f/burnt_quill_s_cutie_mark_final_version_by_burntquill-d8j1is9.png';

import '~/public/assets/About.css'

export default () =>
  <div>
    <div className="logo-container">
      <div className="coquill">COQUILL</div>
      <img className="about-img" src={logo} alt="logo" />
    </div>
    <div className='about-container'>
      <p className='about'>
        Coquill is a real-time collaborative text editor for writing screenplays. Based on the component of the screenplay that you select, the editor will automatically format your text and provide styling. If you would like other people to write with you, simply link them to your screenplay.
      </p>
    <Link to='/screenplays'>
      <button className='start-button'>Get Started Now!</button>
    </Link>
    </div>
  </div>

  // Coquill is a real-time collaborative text editor for writing screenplays.
  //       Based on your selection, the editor will automatically format your text
  //       and provide text styling if need be. Once you have created a screenplay,
  //       the editor will project colors on the page which map to the context of
  //       your text.