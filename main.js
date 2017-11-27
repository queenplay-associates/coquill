import React from 'react'
//import Routes from './client/routes'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader';
//import Editor from '~/client/components/Editor';

//import { BrowserRouter as Router } from 'react-router-dom';
//import GuangApp from '~/client/components/GuangApp.jsx'
import Editor from '~/client/components/Editor';
import Script from '~/client/components/Script';
import {db} from '~/public/secrets'

// import { BrowserRouter as Router } from 'react-router-dom';

function main() {
  render(
  <AppContainer>
    <Editor fireRef={db.ref('screenplay')}>
      <Script />
    </Editor>
  </AppContainer>,
  document.getElementById('main'))
}

main();

module.hot && module.hot.accept('~/client/components/Editor', main);
//module.hot && module.hot.accept('~/client/components/GuangApp.jsx', main);