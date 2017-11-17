import React from 'react'
import {render} from 'react-dom'
import {AppContainer} from 'react-hot-loader';
import {Editor} from './client/components'

import App from '~/App'

function main() {
  render(
    <AppContainer>
       {/* <App />  */}
       <Editor /> 
    </AppContainer>,
    document.getElementById('main'))
}

main()

module.hot && module.hot.accept('~/App', main)
