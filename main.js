import React from 'react'
import Routes from './client/routes'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader';
import Editor from '~/client/components/Editor';

// import { BrowserRouter as Router } from 'react-router-dom';

function main() {
  render(
  <AppContainer>
    <Editor />
    {/*<Routes />*/}
  </AppContainer>,
  document.getElementById('main'))
}

main();

module.hot && module.hot.accept('~/client/components/Editor', main);