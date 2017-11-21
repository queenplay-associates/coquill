import React from 'react';
import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from './reducer'
import fire from '~/public/secrets';

const firebaseMiddleware = store => next => {
  const ref = fire.database().ref().child('screenplay');
  const listener = ref.on('child_added', snap => next(snap.val()));
  // this.unsubscribe = () => ref.off('child_added', listener)

  return action => {
    if (action.doNotSync) { return next(action) }
    const actionKey = ref.push().key;

    return ref.child(actionKey).set({actionKey, ...action})
  }
};
/*
// attach key here
      =>
// hold state in store, create store in screenplay component
*/

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(
      createLogger({collapsed: true}),
      firebaseMiddleware
    )
  )
);

export default store
export * from './reducer'