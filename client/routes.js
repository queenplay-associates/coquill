import React, {Component} from 'react'
import {Router} from 'react-router'
import {Route, Switch, Redirect} from 'react-router-dom'
import {Editor} from './components'

class Routes extends Component {

  render () {
    return (
      <Router>
          <Switch>
            <Route path="/" component={Editor} />
          </Switch>
      </Router>
    )
  }
}