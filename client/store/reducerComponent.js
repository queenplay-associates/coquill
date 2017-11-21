import Delta from 'quill-delta'
import { OrderedMap, fromJS } from 'immutable'

const PUSH_OBJECT = 'PUSH_OBJECT',
      REMOVE_OBJECT = 'REMOVE_OBJECT' 

const pushObject = objectType => ({
  type: PUSH_OBJECT,
  objectType
});

const reducer = (state = OrderedMap(), action) => {
  switch (action.type) {
    case PUSH_OBJECT:
        return state.set(action.actionKey, {
        type: action.objectType,
        });
    case REMOVE_OBJECT:
        return state.set(action.actionKey, {
        type: action.objectType,
    });
    default:
        return state
  }
}

function itemReducer(item, action) {
  const {type} = action
  if (type === APPLY_DELTA)
    return {...item, delta: deltaReducer(item.delta, action)}
  if (type === CHANGE_TYPE)
    return {...item, type: action.objectType}
  return item
}

function deltaReducer(delta=new Delta, action) {
  return delta.compose(action.delta)
} 

export default reducer