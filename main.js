import React from 'react'
import Routes from './client/routes'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader';
import Editor from '~/client/components/Editor';
import fire from '~/public/secrets'

// import { BrowserRouter as Router } from 'react-router-dom';
const db = fire.database();

function main() {
  render(
  <AppContainer>
    <Editor fireRef={db.ref().child('screenplay')} />
  </AppContainer>,
  document.getElementById('main'))
}

main();

module.hot && module.hot.accept('~/client/components/Editor', main);