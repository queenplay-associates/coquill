import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';
import Footer from '~/client/components/Footer'

const carouselImages = [
  'https://quilljs.com/assets/images/features/developers.svg',
  'https://quilljs.com/assets/images/features/cross-platform.svg',
  'https://quilljs.com/assets/images/features/scale.svg'
];

export default class ImageCarousel extends Component {
  render() {
    return [
      <Carousel infiniteLoop={true}
                showThumbs={false}
                showArrows={true}
                useKeyboardArrows={true}
                autoPlay={true}
                showStatus={false}
                style={styles}>
        {
          carouselImages.map((img, i) => {
            return <img src={img} key={i} alt={`image ${i}`}/>
          })
        }
      </Carousel>,
      <Footer />
      ];
  }
}