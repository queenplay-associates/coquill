import React from 'react'
import { Link } from 'react-router-dom';

const carouselImages = [
  'https://s-media-cache-ak0.pinimg.com/originals/da/70/b9/da70b95ca65d402ce40ff8cdcd25d335.jpg',
  'https://quilljs.com/assets/images/features/cross-platform.svg',
  'https://quilljs.com/assets/images/features/scale.svg'
];

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
        Coquill is a real-time collaborative text editor for writing screenplays. 
        Based on your selection, the editor will automatically format your text 
        and provide text styling if need be. Once you have created a screenplay, the editor 
        will project colors on the page which map to the context of your text.
      </p>
    <Link className='startbutton' to='/screenplays'>Get Started Now!</Link>
    </div>
  </div>
