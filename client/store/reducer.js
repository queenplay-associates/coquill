import { OrderedMap, fromJS } from 'immutable'

const PUSH = 'PUSH',
      INSERT_BEFORE = 'INSERT_BEFORE',
      INSERT_AFTER = 'INSERT_AFTER',
      SET_VALUE = 'SET_VALUE',
      CHANGE_TYPE = 'CHANGE_TYPE',
      REMOVE_OBJECT = 'REMOVE_OBJECT';

export const pushObject = (objectType) => ({
  type: PUSH,
  objectType
})

/*
export const setValue = (value, index) => ({
  type: SET_VALUE,
  value,
  componentKey: index
})
*/

export const setValue = (value, index, name) => ({
  type: SET_VALUE,
  value,
  componentKey: index,
  name
})


export const insertAfter = (objectType, afterKey) => ({
  type: INSERT_AFTER,
  objectType,
  afterKey
})

export const insertBefore = (objectType, beforeKey) => ({
  type: INSERT_BEFORE,
  objectType,
  beforeKey
})

export const removeObject = (id) => ({
  type: REMOVE_OBJECT,
  id
})

const reducer = (state = OrderedMap(), action) => {

  switch (action.type) {
  case PUSH:
    return state.set(action.actionKey, {
      type: action.objectType,
      key: action.actionKey,
    });

  case REMOVE_OBJECT:
    return state.delete(action.id);

  case INSERT_BEFORE:
    let itemsBefore = state.takeUntil(({key}) => key === action.beforeKey)
    let itemsAfter = state.skipUntil(({key}) => key === action.beforeKey)
    return itemsBefore
      .set(action.actionKey, {
        type: action.objectType,
        key: action.actionKey,
      })
      .merge(itemsAfter)

  case INSERT_AFTER:
      itemsBefore = state.takeUntil(({key}) => key === action.afterKey)
      const after = state.get(action.afterKey)
      itemsAfter = state.skipUntil(({key}) => key === action.afterKey)
                              .delete(action.afterKey)
      return itemsBefore             // Everything before afterKey
        .set(action.afterKey, after) // The thing at afterKey
        .set(action.actionKey, {     // The new node we're inserting
          type: action.objectType,
          key: action.actionKey,
        })
        .merge(itemsAfter)           // Everything else

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
    return {...item, value: action.value, name: action.name}
  if (type === CHANGE_TYPE)
    return {...item, type: action.objectType}
  return item
}

export default reducer