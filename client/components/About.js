import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css'

const carouselImages = [
  'https://s-media-cache-ak0.pinimg.com/originals/da/70/b9/da70b95ca65d402ce40ff8cdcd25d335.jpg',
  'https://quilljs.com/assets/images/features/cross-platform.svg',
  'https://quilljs.com/assets/images/features/scale.svg'
];

import '~/public/assets/About.css'

export default () =>
  <div>
    {/* <Carousel infiniteLoop={true}
              showThumbs={false}
              showArrows={false}
              useKeyboardArrows={true}
              autoPlay={false}
              showStatus={false}
              style={styles}>
      {
        carouselImages.map((img, i) => {
          return <img className="carousel-image"
                      src={img} key={i}
                      alt={`image ${i}`}/>
        })
      }
    </Carousel> */}
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
