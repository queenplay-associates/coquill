import {OrderedMap, fromJS} from 'immutable'

const PUSH = 'PUSH'

export const pushObject = (type, key = generateKey()) => ({type: PUSH, object: {key, type}})

export default (state=OrderedMap(), action) => {
  switch (action.type) {
  case PUSH:
    return state.set(action.object.key, fromJS(action.object))
  default:
    return state
    
  }
}

//write a generate key function