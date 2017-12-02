const sentiment = require('sentiment'),
      Color = require('color'),
      screenplay = 'i am sad'; // import screenplay to access whole text

// TWO METHODS:
// 1. Analyze entire screenplay and map to one overall color
// 2. Break screenplay up in parts (more variables) and map to an
   // ombré color situation maybe

const r1 = sentiment(screenplay);
console.dir(r1);

// how to use the color library
  // constructor-like
  // use in SASS file
const white = Color({r: 255, g: 255, b: 255});

// link: https://www.npmjs.com/package/color