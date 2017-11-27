import React, { Component } from 'react'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import {Provider} from 'react-redux'


import reducer from '../store/reducer'
import fire from '~/public/secrets'
import  {pushObject} from '~/client/store/reducer'

//TODO:
/*
    pass fire as prop, and pass it along 
    use connect to mount actions and props. 

*/
const ListA = (props) => {
    //console.log("ListA props =", props.data);     
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
    constructor(){
        super()
        this.insertHandler = this.insertHandler.bind(this)
        this.pushHandler = this.pushHandler.bind(this)
        console.log("state in construction", this.state)
    }

componentDidMount() {
  console.log("did mount")
  this.mountStoreAtRef(this.props.fireRef)
// the following show data from firebase
//   const db = fire.database().ref().child('screenplay');

//   db.on('value', snap => {
//     this.setState({ screenplay: snap.val()})
//   });
}

componentWillReceiveProps(incoming, outgoing) {
    this.mountStoreAtRef(incoming.fireRef)
    console.log("state in componentWillReceiveProps", this.state)
    
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
    console.log("mountStoreAtRef", this.state)
    
    //window.store = store
}

insertHandler(evt){
    evt.preventDefault();
    
    this.state.store.dispatch({type:'INSERT_BEFORE', objectType: 'Parenthetical', beforeKey:'-KzqNkn8HeH0FBOJPp5Y'})
}

pushHandler(evt){
    evt.preventDefault();
    console.log("push clicked")
    this.state.store.dispatch(pushObject('Dialog'))
    console.log("testAction --->", )
    //debugger
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
            {
                screenplay ? <ListA data={screenplay} /> : <h2>loading </h2>
            }
            <button onClick={this.pushHandler}>pushHander </button>
            <button onClick={this.insertHandler}>insert before Hander </button>
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
