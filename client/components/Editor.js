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
when loading check who owns this screenplay and or attached
for the time being, the ownership is injected separately from the store, should be part of store
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
    const { fireRef, uid, title } = this.props

    this.mountStoreAtRef(fireRef)

    //if user doesn't have screenplays, then add current one
    if (uid) {
      db.ref(`users/${uid}`).once('value', snap => {
        if (!snap.hasChild(contributedScreenPlays))
          snap.ref.update({ [contributedScreenPlays]: title })
      })
    }

    //Get list of users who contribute to this screenplay
    if (title) {
      db.ref('users').orderByChild(contributedScreenPlays)
        .equalTo(title)
        .once('value')
        .then(snap => {
            let names = ''

            snap.forEach(data => {
              const { displayName, photoURL } = data.val()
              names += displayName + ','
              this.setState({ names })
            })
        })
    }
  }

  componentWillReceiveProps(incoming, outgoing) {
    this.mountStoreAtRef(incoming.fireRef);
  }

  componentWillUnmount() {
    this.unsubscribe && this.unsubscribe();
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
      ? ({screenplay} =  this.state, {store} = this.state)
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

    const { title } = this.props,
          { names } = this.state

    return <Provider store={store}>
      <div>
         <nav className="button-container">
           {
             buttonTypes.map(elem =>
               <button key={elem[0]}
                       type="button"
                       onClick={this.handleChange}
                       value={elem[0]}>{elem[1]}
               </button>
             )
           }
         </nav>
         <div className="scriptBox">
          <p className="title">{title.toUpperCase()}</p>
          <div className='writers'>
            <p>Screenplay written by: {
              names[names.length - 1] === ',' ? names.slice(0, -1) : names
              }</p>
          </div>
          <Script />
         <div className="share">
           <hr />
          <span>❤️ your screenplay? Share it!</span>
          <br />
          <a href={`https://www.facebook.com/sharer/sharer.php?u=https%3A//coquill-e559a.firebaseapp.com/screenplays/${title}`}>
            <img src="/assets/facebook_circle.png" height="30px" />
          </a>
          <a href={`https://twitter.com/home?status=https%3A//coquill-e559a.firebaseapp.com/screenplays/${title}`}>
            <img src="/assets/twitter_circle.png" height="30px" />
          </a>
        </div>
      </div>
      </div>
    </Provider>
  }
}