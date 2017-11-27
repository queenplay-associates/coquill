import React, {Component} from 'react';
import ScriptComponent from './ScriptComponent';
import fire from '~/public/secrets';
// import store from '~/client/store/index';
import {Provider} from 'react-redux'
import {pushObject} from '~/client/store/reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import reducer from '../store/reducer';

export default class Editor extends Component {
  constructor() {
    super();
    this.state = { 
      screenplay: {},
      components: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.mountStoreAtRef(this.props.fireRef)

    const db = fire.database().ref().child('screenplay');

    db.on('value', snap => {
       let newComponent = [];
      if(snap.val()) {
        for (var snapVal in snap.val()) {
          if(snap.val()[snapVal].type === "PUSH") {
            newComponent.push(snap.val()[snapVal].objectType);
          }
          if(snap.val()[snapVal].type === "APPLY_DELTA") {
            //what do i do
          }
        }
      } 
      this.setState({ 
        screenplay: snap.val(), 
        components: newComponent
      })
      console.log("COMPONENTS", this.state.components)
    });

    // db.on('child_removed', snap => {
    //  console.log('child element removed ---> val =', snap.val())
    // })
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
            const ref = fire.database().ref().child('screenplay');
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
    ( this.state ) ? ( {screenplay} =  this.state, {store} = this.state ) : screenplay = {} 
 
     if (!store) return null
     console.log("state after render --->", this.state || "" )
     
     return (
     <Provider store={store}>
         <div>
             <p>hello content -></p>

             <button type="button"
                      onClick={this.handleChange}
                      value ="sceneHeading">Scene Heading</button>
              <button type="button"
                      onClick={this.handleChange}
                      value ="character">Character</button>
              <button type="button"
                      onClick={this.handleChange}
                      value ="parenthetical">Parenthetical</button>
              <button type="button"
                      onClick={this.handleChange}
                      value="dialogue">Dialogue</button>
              <button type="button"
                      onClick={this.handleChange}
                      value ="action">Action</button>
              <button type="button"
                      onClick={this.handleChange}
                      value ="transition">Transition</button>
              <button type="button"
                      onClick={this.handleChange}
                      value ="shot">Shot</button>
              <button type="button"
                      onClick={this.handleChange}
                      value ="text">Text</button>
             <p>🔥🔥</p>
             {this.state.components && this.state.components.map((component, i) =>
              { return <ScriptComponent key={i} index={i} type={component} store={this.state.store}/>; })}
         </div>
     </Provider>
     )
 }
}

// DROP DOWN
            // <select onChange={this.handleChange}>
            //     <option value="">Select</option>
            //     <option value ="dialogue">Dialogue</option>
            //     <option value ="character">Character</option>
            // </select>