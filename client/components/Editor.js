import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { pushObject } from '~/client/store/reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import reducer from '../store/reducer';

import Script from '~/client/components/Script';
import '~/public/assets/Editor.css';

export default class Editor extends Component {
  constructor() {
    super();
    this.state = {};
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
    if (this.state && this.state.store) {
      this.unsubscribe && this.unsubscribe()
        this.unsubscribe = null;
      console.log("screenplay title:", this,state);
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
         <p className="title">SCREENPLAY TITLE</p>
         {/* {console.log("screenplay title: ", ref)} */}
         <Script />
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