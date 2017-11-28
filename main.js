import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader';
<<<<<<< HEAD
import Editor from '~/client/components/Editor';
import Script from '~/client/components/Script';
import {db} from '~/public/secrets'

function main() {
  render(
  <AppContainer>
    <Editor fireRef={db.ref('screenplay')}>
      <Script />
    </Editor>
  </AppContainer>,
  document.getElementById('main'))
=======
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
>>>>>>> master
}

main();

module.hot && module.hot.accept('~/client/Root', main);