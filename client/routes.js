import React from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Editor from './components/Editor';
import App from '../App.jsx';

const Routes = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Editor} />
          <Route exact path="/fire" component={App} />
        </Switch>
      </BrowserRouter>
    </div>
  )
};

export default Routes
