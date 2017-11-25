import React, { Component } from 'react'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'

import reducer from '../store/reducer'
import {Provider} from 'react-redux'
import { firebaseMiddleware } from '~/client/store/index'
import fire from '~/public/secrets'

//let store;

const ListA = (props) => {
    console.log("ListA props =", props.data);     
    return ( 
        <div>
        <h1> 👩🏻‍🚒data from store </h1>
        {
            Object.values(props.data).map(ele => (
                <li key={ele.actionKey} value={ele.objectType} > {ele.actionKey} {ele.objectType} </li>
            ))       
        }
        }
    </div>
    )
}

export default class GuangApp extends Component {

componentDidMount() {
  console.log("did mount")
  this.mountStoreAtRef(this.props.fireRef)
  
  const db = fire.database().ref().child('screenplay');

  db.on('value', snap => {
    this.setState({ screenplay: snap.val()})
  });
}

componentWillReceiveProps(incoming, outgoing) {
    this.mountStoreAtRef(incoming.fireRef)
  }

  componentWillUnmount() {
    this.unsubscribe && this.unsubscribe()
  }

mountStoreAtRef(ref) {
    if (this.state && this.state.store) {
        this.unsubscribe && this.unsubscribe()
        this.unsubscribe = null

        this.setState({store:null})
        return process.nextTick( ()=> this.mountStoreAtRef(ref))
    }

     const store = createStore(
        reducer,
        composeWithDevTools(
            applyMiddleware(
                createLogger({ collapsed: true }),
                 store => next => {
                    const ref = fire.database().ref().child('screenplay');
                    return action => {
                      if (action.doNotSync) { return next(action) }
                      const actionKey = ref.push().key;
                      return ref.child(actionKey).set({actionKey, ...action})
                    }
                  }
            )
        )
    )
    this.setState({store})
    window.store = store
}

insertHandler(evt){
    evt.preventDefault();
}

pushHandler(evt){
    evt.preventDefault();
    
    
}

render() {
    
   let screenplay, store
   ( this.state ) ? ( {screenplay} =  this.state, {store} = this.state ) : screenplay = {} 

    if (!store) return null
    return (
    <Provider store={store}>
        <div>
            <p>hello content -></p>
            {
                screenplay ? <ListA data={screenplay} /> : <h2>loading </h2>

            }
            <button onClick={this.pushHandler}>pushHander </button>
            <button onClick={this.insertHandler}>insertHander </button>
            <p>🔥🔥</p>
        </div>
    </Provider>
    )
    }
}


/*test for names 
  Scene heading
  Action
  Character
  Dialog
  Parenthetical
  Transition
  Shot
  Text
  <h1> 🔥 Ready.Guang bb go </h1>
*/
