import React, {Component} from 'react'
//import {Router} from 'react-router'
import {Route, Switch, BrowserRouter} from 'react-router-dom'
import {Editor} from './components'
import App from '../App.jsx'


const Routes = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/fire" component={App} />
          <Route exact path="/" component={Editor} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default Routes
