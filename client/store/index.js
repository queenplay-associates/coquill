import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from './reducer'

const reducer = combineReducers({reducer})

    const store = createStore(
      reducer,
      composeWithDevTools(
        applyMiddleware(
          createLogger({collapsed: true}),
          thunkMiddleware,

        //   store => next => {
        //     const listener = ref.on('child_added', snapshot => next(snapshot.val()))
        //     this.unsubscribe = () => ref.off('child_added', listener)

        //     return action => {
        //       if (action.doNotSync) { return next(action) }
        //       return ref.push(action)
        //     }
        //   }
        )
      )
    )
    this.setState({store})


export default store
export * from './reducer'