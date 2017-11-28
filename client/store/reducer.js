import Delta from 'quill-delta'
import { OrderedMap, fromJS } from 'immutable'

const PUSH = 'PUSH',
      INSERT_BEFORE = 'INSERT_BEFORE',
      INSERT_AFTER = 'INSERT_AFTER',
      SET_VALUE = 'SET_VALUE',
      CHANGE_TYPE = 'CHANGE_TYPE';

export const pushObject = (objectType) => ({
  type: PUSH,
  objectType
})
export const setValue = (value, index) => ({
  type: SET_VALUE,
  value,
  componentKey: index
})
export const setContent = (content, componentKey) => ({
  type: SET_VALUE,
  content, componentKey,
})

const reducer = (state = OrderedMap(), action) => {
  switch (action.type) {
  case PUSH:
    return state.set(action.actionKey, {
      type: action.objectType,
      key: action.actionKey,
    });

  case INSERT_BEFORE:
    const itemsBefore = state.takeUntil(({key}) => key === action.beforeKey)
    const itemsAfter = state.skipUntil(({key}) => key === action.beforeKey)
    return itemsBefore
      .set(action.actionKey, {
        type: action.objectType,
        key: action.actionKey,
      })
      .merge(itemsAfter)
  
  case INSERT_AFTER:
      const itemsBefore = state.takeUntil(({key}) => key === action.afterKey)
      const after = state.get(action.afterKey)
      const itemsAfter = state.skipUntil(({key}) => key === action.afterKey)
                              .delete(action.afterKey)
      return itemsBefore             // Everything before afterKey
        .set(action.afterKey, after) // The thing at afterKey
        .set(action.actionKey, {     // The new node we're inserting
          type: action.objectType,
          key: action.actionKey,
        })
        .merge(itemsAfter)           // Everything else
  // Add support for INSERT_BEFORE, INSERT_AFTER
  case SET_VALUE:
  case CHANGE_TYPE:
    return state.update(action.componentKey, item => itemReducer(item, action))

  default:
    return state
  }
}

function itemReducer(item={}, action) {
  const {type} = action
  if (type === SET_VALUE)
    return {...item, value: action.value}
  if (type === CHANGE_TYPE)
    return {...item, type: action.objectType}
  return item
}

export default reducer
/*
get components rendering off of this state
dispatch (dialogue, push new dialogue)

INSERT (PUSH)
{
  after: self
  node: (type) => "dialogue"
}

mw will push this object to firebase, reducer will push that to state
redux -> mw -> firebase -> mw -> reducer -> state -> component

DELTA
{
  delta (quill delta implementation)
}

delta math -> apply that delta into current delta inside reducer

[logline, action]
// orderedMap
{
  key: '',
  type: '',
  content: '',
}

SET_VALUE (key, delta) {
  key: '',
  delta: ''
}

--------
ACTIONS:
PUSH (type)
// add below two when you say: "gosh, I wish I could add something here"
INSERT_AFTER (type, afterKey)
INSERT_BEFORE (type, beforeKey)
// above three edit the structures
// there's a reducer whose state is an orderedMap
// those methods are picked up by the reducer (placed in certain pos)

DELTA (type, key, delta)
  => knows how to take a node and return the new node
  => applies the delta to the node's content
CHANGE_TYPE (type, key)
// one layer down
// both take a key
// reducer that reacts on different reducers on the orderedMap

state.update(key, item => itemReducer(item, action))
  // this happens in the reducer, calling into an item reducer when it sees
  // one of these types
*/