import Delta from 'quill-delta'
import { OrderedMap, fromJS } from 'immutable'

const PUSH = 'PUSH',
      INSERT_BEFORE = 'INSERT_BEFORE',
      APPLY_DELTA = 'APPLY_DELTA',
      CHANGE_TYPE = 'CHANGE_TYPE'   

export const pushObject = (objectType) => ({
  type: PUSH,
  objectType
})
export const applyDelta = (delta, index) => ({
  type: APPLY_DELTA,
  delta,
  componentKey: index
})

const reducer = (state = OrderedMap(), action) => {
  switch (action.type) {
  case PUSH:
    return state.set(action.actionKey, {
      type: action.objectType,
    });
  case INSERT_BEFORE:
    const itemsBefore = state.takeUntil(({key}) => key === action.beforeKey)
    const itemsAfter = state.takeLast(state.count - itemsBefore.count)
    return itemsBefore
      .set(action.actionKey, {
        type: action.objectType
      })
      .merge(itemsAfter)
  // Add support for INSERT_BEFORE, INSERT_AFTER
  case APPLY_DELTA:
      return state.set(action.actionKey, {
        type: action.objectType,
      });
  case CHANGE_TYPE:
    return state.update(action.key, item => itemReducer(item, action))

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

APPLY_DELTA (key, delta) {
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