var Immutable = require('immutable');
const {OrderedMap} = Immutable


const abc = OrderedMap({a: {key: 'a'}, b: {key: 'b'}, c: {key: 'c'}, d:{key:'d'}})
const abcArray = abc.takeUntil(({key}) => key === 'c').set('z', {key: 'z'})
const endArray = abc.skipUntil(({key}) => key === 'c')
const sum = Array.from(abcArray.merge(endArray))


//[...abc.takeUntil(({key}) => key === 'b')]

//({a: 2, b: 3, c:1})

//const cde = abc.takeUntil(({x}) => x === 'b')

console.log(sum)
