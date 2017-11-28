import React, {Component} from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
// need this to access store from window
import store from '~/client/store'

import Navbar from './components/Navbar'
import Carousel from './components/Carousel'
import Editor from './components/Editor'
import Footer from './components/Footer'

export default class Root extends Component {
  componentDidMount() {
    // functions for nav-bar links to render properly (maybe?)
    // store.dispatch();
  }

  render() {
    return (
      <div>
        <Navbar/>
        <Carousel/>
        <Footer />
        <Switch>
          {/*<Route path="/" component={Carousel} />*/}
          {/*<Route exact path="/editor" component={Editor}/>*/}
          {/*{until we get our SPA issue resolved -->}*/}
          <Route path='/' component={Editor}/>
          <Redirect to='/' component={Editor}/>
        </Switch>
      </div>
    );
  }
}

