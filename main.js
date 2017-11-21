import React from 'react'
import Routes from './client/routes'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader';
import App from '~/App';

// import { BrowserRouter as Router } from 'react-router-dom';
// import Routes from './client/routes';

function main() {
  render(
    <AppContainer>
      <App />
       {/*<Routes />*/}
    </AppContainer>,
    document.getElementById('main'))
}

main();

module.hot && module.hot.accept('~/App', main);

/*
dynamic:

add character

screenplay/scenes/scene_5/character_1
 */