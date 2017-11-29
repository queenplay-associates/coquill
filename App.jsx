import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

import Navbar from '~/client/components/Navbar'
import Editor from '~/client/components/Editor'
import Footer from '~/client/components/Footer'
import About from '~/client/components/About'
import Screenplays from '~/client/components/Screenplays'

import { db } from '~/public/secrets'

export default () =>
  <Router>
    <div>
      <Navbar/>
      <Footer />
        <Switch>
          <Route exact path='/' component={() =>
            <Editor fireRef={db.ref('screenplays').child('welcome')}/>
          }/>
          {/* <Route path='/screenplays' component={Screenplays}/> */}
          <Route exact path='/screenplays/:screenplayId' component={
            ({match: {params: {screenplayId}}}) =>
              <Editor fireRef={db.ref('screenplays').child(screenplayId)}/>
          }/>
          <Route path="/about" component={About}/>
        </Switch>
    </div>
  </Router>

// http://localhost:8080/screenplays/blah was working for the route above