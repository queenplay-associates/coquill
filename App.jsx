import React, { Component } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Screenplays from '~/client/components/Screenplays'

import Navbar from '~/client/components/Navbar'
import Editor from '~/client/components/Editor'
import About from '~/client/components/About'
import { db } from '~/public/secrets'
import Auth from '~/client/components/Auth'

//TODO: make fire thing into promises
import firebase from 'firebase';

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      loginStatus: false,
      userName: 'Stranger🤷🏻‍',
      faceUrl: ''
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (!user) return
      let name;
      user.isAnonymous
        ? name = 'Anonymous'
        : name = user.displayName
      this.setState({loginStatus: true, userName: name, faceUrl: user.photoURL})
      console.log("who is loged in-- user and uid-> ", name, user.uid)
      
    })
  }

  render() {
    return <Router>
      <div>
        <Navbar logInStatus={this.state.loginStatus} userName={this.state.userName}/>
        <Switch>
          <Route exact path='/' component={() =>
            <Editor title={'🔥 Welcome to Coquill 🔥'}
                    fireRef={db.ref('screenplays')
                                .child('welcome')}/>
          }/>
           <Route exact path='/screenplays' component={Screenplays}/>  
          <Route exact path='/screenplays/:screenplayId' component={
            ({match: {params: {screenplayId}}}) =>
              <Editor title={screenplayId} fireRef={db.ref('screenplays').child(screenplayId)}/>
          }/>
          <Route path="/about" component={About}/>
          <Route path="/login" component={() =>
            <Auth db={db} userName={this.state.userName} userFace={this.state.faceUrl}
                  status={this.state.loginStatus}/>
          }/>
        </Switch>
      </div>
    </Router>
  }
}
