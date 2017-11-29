import React, { Component } from 'react';
import { Route, Switch, Redirect, BrowserRouter as Router } from 'react-router-dom';

import Navbar from '~/client/components/Navbar'
import Carousel from '~/client/components/Carousel'
import Editor from '~/client/components/Editor'
import Footer from '~/client/components/Footer'

import { db } from '~/public/secrets'
import Auth from '~/client/components/Auth'

//check fireUser
//TODO: make this into a promise
import firebase from 'firebase';

export default class App extends Component {
  constructor() {
    super()
    this.state = { loginStatus: false, userName: "Stranger" }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ loginStatus: true, userName: user.displayName })
        console.log("user---->", name, user)
      } else {
        // No user is signed in.
      }
    });
  }

  render() {
    return (
      <Router>
        <div>
          <Navbar logInStatus={this.state.loginStatus} />
          <Footer />
          <Switch>
            <Route exact path='/' component={Carousel} />
            <Route exact path='/screenplays/:screenplayId' component={
              ({ match: { params: { screenplayId } } }) =>
                <Editor fireRef={db.ref('screenplays').child(screenplayId)} />
            } />
            <Route exact path='/login' component={Auth} />
          </Switch>
        </div>
      </Router>
    )
  }
}