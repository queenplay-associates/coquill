const { OrderedMap, fromJS } = require('immutable');

let i = 0;
function generateKey() {
  return ++i;
}

const PUSH = 'PUSH'
    , INSERT_CHARACTER = 'INSERT_CHARACTER';

export const pushObject = (type, key = generateKey) => ({
  type: PUSH,
  object: { key, type }
});

export const insertCharacter = (type, key = generateKey) => ({
  type: INSERT_CHARACTER,
  object: { key, type }
});

export default (state = OrderedMap(), action) => {
  switch (action.type) {
  case PUSH:
    return state.set(action.object.key, fromJS(action.object));
  case INSERT_CHARACTER:
    return state.set(action.object.key, fromJS(action.object));
  default:
    return state
  }
}

module.exports = generateKey;