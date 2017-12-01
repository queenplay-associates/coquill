import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { pushObject } from '~/client/store/reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import reducer from '../store/reducer';

import Script from '~/client/components/Script';
import '~/public/assets/Buttons.css';

import firebase from 'firebase';
import { db } from '~/public/secrets'

//TODO: 
/*
when loading check who owns this screen play and or attached 
for the time being, the ownership is injected separeact from the store, should be part of store
check if already have a screen play owner, otherwise attach the current auth 
line 73 bug! 
*/

//db screenplays/'childNode' 
const contributedScreenPlays = "contributedScreenPlays"

export default class Editor extends Component {
  constructor() {
    super();
    this.state = {names:''};
  }

  componentDidMount() {
    this.mountStoreAtRef(this.props.fireRef)

    //if user dont have screenplays, then added this current one
    if (this.props.uid) {
      db.ref(`users/${this.props.uid}`).once('value', snap => {
        if (!snap.hasChild(contributedScreenPlays)) 
          snap.ref.update({ [contributedScreenPlays]: this.props.title })
      })
    }

    //Get lists of users contribute to this screenPlay
    if (this.props.title) {
      db.ref('users').orderByChild(contributedScreenPlays)
        .equalTo(this.props.title)
        .once('value')
        .then(snap => {
          const value = snap.val()
          let names = ''
          snap.forEach( data => {
            const {displayName, photoURL } = data.val()
            names += displayName + ','
            this.setState({names})
            })
          //console.log(this.state.names)
          })
        }
  }

  componentWillReceiveProps(incoming, outgoing) {
    this.mountStoreAtRef(incoming.fireRef);    
  }

  componentWillUnmount() {
    this.unsubscribe && this.unsubscribe();
  }

  renderWriters(names) {
    return <div className='writers'>
      <p>so far wrote by: {this.writers}</p>
    </div>
  }

  mountStoreAtRef(ref) {

    if (this.state && this.state.store) {
      this.unsubscribe && this.unsubscribe()
        this.unsubscribe = null;
      this.setState({store:null})
      return process.nextTick(() => this.mountStoreAtRef(ref))
    }

    const store = createStore(
      reducer,
      composeWithDevTools(
        applyMiddleware(
          createLogger({ collapsed: true}),
          store => next => {
            function dispatchSnapshot(snap) {
                const action = snap.val()
                next(action)
            }
            ref.on('child_added', dispatchSnapshot)
            this.unsubscribe = () => ref.off('child_added', dispatchSnapshot)

            return action => {
              if(action.doNotSync) return next(action)
              const actionKey = ref.push().key;
              return ref.child(actionKey).set({actionKey, ...action})
            }
          }
        )
      )
    )
    this.setState({store})
  }

  handleChange = evt => {
    this.state.store.dispatch(pushObject(evt.target.value))
  }

  render() {
    let screenplay, store
    this.state
      ? ( {screenplay} =  this.state, {store} = this.state )
      : screenplay = {}

    if (!store) return null

    const buttonTypes = [
      ['sceneHeading', 'Scene Heading'],
      ['action', 'Action'],
      ['character', 'Character'],
      ['parenthetical', 'Parenthetical'],
      ['dialogue', 'Dialogue'],
      ['shot', 'Shot'],
      ['transition', 'Transition'],
      ['text', 'Text']
    ];

    return <Provider store={store}>
      <div>
         <nav className="button-container">
           {
             buttonTypes.map(elem =>
               <button className={elem[2]}
                       key={elem[0]}
                       type="button"
                       onClick={this.handleChange}
                       value={elem[0]}>{elem[1]}
               </button>
             )
           }
         </nav>
         <nav className="scriptBox">
          <p className="title">{(this.props.title).toUpperCase()}</p>
          <div className='writers'>
            <p>wrote by: {this.state.names}</p>
          </div>
          <Script />
         </nav>
      </div>
    </Provider>
  }
}

// DROP DOWN
// <select onChange={this.handleChange}>
//     <option value="">Select</option>
//     <option value="dialogue">Dialogue</option>
//     <option value="character">Character</option>
// </select>