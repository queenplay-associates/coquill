import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader';
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
}

main();

module.hot && module.hot.accept('~/client/Root', main);