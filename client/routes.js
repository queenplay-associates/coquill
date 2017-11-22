import React from 'react'

import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
//import { Editor } from './components'
import App from '../App.jsx'

const Routes = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/fire" component={App} />
          <Route exact path="/" component={Editor} />
        </Switch>
      </Router>
    </div>
  )
};

export default Routes
