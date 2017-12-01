import React from 'react'

const carouselImages = [
  'https://s-media-cache-ak0.pinimg.com/originals/da/70/b9/da70b95ca65d402ce40ff8cdcd25d335.jpg',
  'https://quilljs.com/assets/images/features/cross-platform.svg',
  'https://quilljs.com/assets/images/features/scale.svg'
];

import '~/public/assets/About.css'

export default () =>
  <div>
    <div className='about'>
      <p>
        Coquill is a real-time collaborative text editor for writing
        screenplays. Based on your selection, the editor will automatically
        format your text and provide all-caps writing if need be. Once you
        have created a screenplay, the editor will project colors on the page
        which map to the context of your text.
      </p>
    </div>
  </div>
