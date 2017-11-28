import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';

const carouselImages = [
  'https://s-media-cache-ak0.pinimg.com/originals/da/70/b9/da70b95ca65d402ce40ff8cdcd25d335.jpg',
  'https://quilljs.com/assets/images/features/cross-platform.svg',
  'https://quilljs.com/assets/images/features/scale.svg'
];

export default class ImageCarousel extends Component {
  render() {
    return (
      <Carousel infiniteLoop={true}
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
      </Carousel>
    );
  }
}