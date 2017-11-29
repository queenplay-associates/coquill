import React, {Component} from 'react';
import {Provider} from 'react-redux'
import {pushObject} from '~/client/store/reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import reducer from '../store/reducer';

import Script from '~/client/components/Script';

export default class Editor extends Component {
  constructor() {
    super();
    this.state = { };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.mountStoreAtRef(this.props.fireRef)
  }

  componentWillReceiveProps(incoming, outgoing) {
    this.mountStoreAtRef(incoming.fireRef);    
  }

  componentWillUnmount() {
    this.unsubscribe && this.unsubscribe();
  }

  mountStoreAtRef(ref) {
    if(this.state && this.state.store) {
      this.unsubscribe && this.unsubscribe()
      this.unsubscribe = null;

      this.setState({store:null})
      return process.nextTick( () => this.mountStoreAtRef(ref))
    }

    const store = createStore(
      reducer,
      composeWithDevTools(
        applyMiddleware(
          createLogger({ collapsed: true}),
          store => next => {
            function dispatchSnapshot(snap) {
                const action = snap.val()
                //next(action)
            }

            ref.on('child_added', dispatchSnapshot)
            this.unsubscribe = () => ref.off('child_added', dispatchSnapshot)

            return action => {
              if(action.doNotSync) { return next(action) }
              const actionKey = ref.push().key;
              return ref.child(actionKey).set({actionKey, ...action})
            }
          }
        )
      )
    )
    this.setState({store})
  }

  handleChange(evt) {
    this.state.store.dispatch(pushObject(evt.target.value))
  }

  render() {

    let screenplay, store
    this.state
      ? ( {screenplay} =  this.state, {store} = this.state )
      : screenplay = {}

     if (!store) return null

     const content = JSON.stringify(this.state.screenplay, null, 3);

         const buttonTypes = [
           ['sceneHeading', 'Scene Heading'],
           ['character', 'Character'],
           ['parenthetical', 'Parenthetical'],
           ['dialogue', 'Dialogue'],
           ['action', 'Action'],
           ['transition', 'Transition'],
           ['shot', 'Shot'],
           ['text', 'Text']
         ];

     return (
       <Provider store={store}>
           <div>
               <p>SCREENPLAY TITLE</p>
               <nav>
                  {
                    buttonTypes.map(elem => {
                      return (
                        <button key={elem[0]}
                                type="button"
                                onClick={this.handleChange}
                                value={elem[0]}>{elem[1]}
                        </button>
                      )
                    })
                  }
                </nav>
               <p>🔥🔥</p>
               <Script />
           </div>
      </Provider>
     )
  }

}

// DROP DOWN
// <select onChange={this.handleChange}>
//     <option value="">Select</option>
//     <option value="dialogue">Dialogue</option>
//     <option value="character">Character</option>
// </select>

/*
    <Editor fireRef={db.ref('screenplay')}>
      <Script />
    </Editor>
 */