import React from 'react'
import {render} from 'react-dom'
import {AppContainer} from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom'

import Routes from './client/routes'

function main() {
  render(
    <AppContainer>
       <Routes />
    </AppContainer>,
    document.getElementById('main'))
}

main();

module.hot && module.hot.accept('~/App', main);