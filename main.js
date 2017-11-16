import React from 'react'
import {render} from 'react-dom'
import {AppContainer} from 'react-hot-loader';
import {Dialogue} from './client/components'

import App from '~/App'

function main() {
  render(
    <AppContainer>
       {/* <App />  */}
       <Dialogue /> 
    </AppContainer>,
    document.getElementById('main'))
}

main()

module.hot && module.hot.accept('~/App', main)
