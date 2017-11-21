import React from 'react';
import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from './reducer'

const firebaseMiddleware = store => next => {
  // const listener = ref.on('child_added', snap => next(snap.val()));
  // this.unsubscribe = () => ref.off('child_added', listener)
  //
  // return action => {
  //   if (action.doNotSync) { return next(action) }
  //   return ref.push(action)
  // }
};

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(
      createLogger({collapsed: true}),
      thunkMiddleware,
      // firebaseMiddleware
    )
  )
);

this.setState({store});
export default store
export * from './reducer'