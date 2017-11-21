import {OrderedMap, fromJS} from 'immutable'

const PUSH = 'PUSH'
const REMOVE = 'REMOVE'

export const pushObject = (type, key = generateKey()) => ({type: PUSH, object: {key, type}})
// export const removeObject = (id) => ({type: REMOVE, id})

// export const removeObjectThunk = (id) =>
//   dispatch => {
//     dispatch(removeObject(id))
//   }

export default (state=OrderedMap(), action) => {
  switch (action.type) {
  case PUSH:
    return state.set(action.object.key, fromJS(action.object))
  // case REMOVE:
  //   return state
  default:
    return state
    
  }
}

//write a generate key function