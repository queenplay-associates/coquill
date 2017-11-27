import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter as Router } from 'react-router-dom';
import Root from '~/client/Root';

function main() {
  render(
    <AppContainer>
      <Router>
        <Root />
      </Router>
    </AppContainer>,
    document.getElementById('main')
  )
}

main();

module.hot && module.hot.accept('~/client/Root', main);