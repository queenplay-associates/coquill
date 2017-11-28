import React from 'react';
import { Route, Switch, Redirect, BrowserRouter as Router } from 'react-router-dom';

import Navbar from '~/client/components/Navbar'
import Carousel from '~/client/components/Carousel'
import Editor from '~/client/components/Editor'
import Footer from '~/client/components/Footer'

import {db} from '~/public/secrets'

export default () =>
  <Router>
    <div>
      <Navbar/>
      <Footer />
        <Switch>
          <Route exact path='/' component={Carousel}/>
          <Route exact path='/screenplays/:screenplayId' component={
            ({match: {params: {screenplayId}}}) =>
              <Editor fireRef={db.ref('screenplays').child(screenplayId)}/>
          }/>
        </Switch>
    </div>
  </Router>
