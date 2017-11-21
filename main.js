import React from 'react'
import Routes from './client/routes'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader';
// import App from '~/App';
import Editor from '~/client/components/Editor';

function main() {
  render(
    <AppContainer>
       <Routes routes={Editor}/>
    </AppContainer>,
    document.getElementById('main'))
}

main();

module.hot && module.hot.accept('~/client/components/Editor', main);

/*
dynamic:

add character

screenplay/scenes/scene_5/character_1
 */