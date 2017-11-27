import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter as Router } from 'react-router-dom';
import Editor from '~/client/components/Editor';

function main() {
  render(
    <AppContainer>
      <Router>
        <Editor />
      </Router>
    </AppContainer>,
    document.getElementById('main')
  )
}

main();

module.hot && module.hot.accept('~/client/components/Editor', main);