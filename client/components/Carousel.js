import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';

const carouselImages = [
  'http://static.cdprojektred.com/thewitcher.com/media/wallpapers/witcher3/full/witcher3_en_wallpaper_the_witcher_3_wild_hunt_geralt_with_trophies_1920x1080_1449484678.png',
  'http://static.cdprojektred.com/thewitcher.com/media/wallpapers/witcher3/full/witcher3_en_wallpaper_the_witcher_3_wild_hunt_ciri_meditating_1920x1080_1446715311.png',
  'http://static.cdprojektred.com/thewitcher.com/media/wallpapers/witcher3/full/witcher3_en_wallpaper_wallpaper_10_1920x1080_1433327726.jpg',
  'http://static.cdprojektred.com/thewitcher.com/media/wallpapers/witcher3/full/witcher3_en_wallpaper_wallpaper_9_1920x1080_1433245987.png',
  'http://static.cdprojektred.com/thewitcher.com/media/wallpapers/witcher3/full/witcher3_en_wallpaper_wallpaper_8_1920x1080_1433245948.jpg',
  'http://static.cdprojektred.com/thewitcher.com/media/wallpapers/witcher3/full/witcher3_en_wallpaper_wallpaper_6_1920x1080_1433245878.jpg',
  'https://static.cdprojektred.com/thewitcher.com/media/wallpapers/witcher3/full/thewitcher.com_en_1920x1080_59ad4d4a17395.jpg'
];

export default class ImageCarousel extends Component {
  render() {
    return (
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
      </Carousel>
    );
  }
}