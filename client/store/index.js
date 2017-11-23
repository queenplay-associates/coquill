import React from 'react';
import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from './reducer'
import fire from '~/public/secrets';

import firebase from 'firebase';


const firebaseMiddleware = store => next => {
  const ref = firebase.database().ref().child('screenplay');
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
window.store = store
/*
//ex : add char in to firebase
export const addChar = (name) => {
    //firebase ref, check if child exist, then add 
    const ref = fire.database().ref().child("screenplay")
    // screenplays/screenplay1/actions
    
    ref.once('value', snap => {
      if (snap.hasChild('characters')) {
        snap.ref.push({name})
      } else {
        //makek new char child
        // ref.on("child_added", snap => {
        //   console.log("snap", snap)
        //   snap.ref().add()
        // })
      }
    });
}*/
  
export default store
export * from './reducer'