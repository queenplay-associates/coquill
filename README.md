# Coquill 

![N|Solid](https://img00.deviantart.net/3b69/i/2015/125/6/f/burnt_quill_s_cutie_mark_final_version_by_burntquill-d8j1is9.png)

> Coquill is a real-time collaborative text editor for writing screenplays. 
> Based on your selection, the editor will automatically format your text and 
> provide text styling if need be. Once you have created a screenplay, 
> the editor will project colors on the page which map to the context of your text.
> Created by ❤️ [Eleni](https://github.com/DatGreekChick) 💜 [Samantha](https://github.com/samsterzz)  💖 [Christina](https://github.com/cyng24) 💙 [Guang](https://github.com/guangLess)️
️

### Tech Stacks
*****React, Redux, Firebase, Immutable.js, Webpack, Babel, React-hot-loader, Sentiment(to be implemented*****

##### Data Flow
  - Data from Coquill to Firebase 👆🏽🌪:              
    - Typed words - - ->  Redux (locally stored as a tree structure) - - > dispatched to Firebase(stored as a flat-ish lists consist of Redux actions which carried the word character bits data)
- Data from the Firebase to Coquill 🌧☟:
    - Database listens to each unique action key on change - - -> those listeners trigger Redux actions - - -> local state get updated - - -> React component renders individually
- Each Screen play 's  (what are those called? Actions Scene headings ) content is a conponment, each those kind is a node in Redux state. Ex: A screenplay might have 50+ conpomenets rendered, the State has potential fixed amount of node (Action, dia , etc)
- Each dispatched action with word content also carries writer's content, when working on the same screenplay, writer knows the other writer is writing at where.

Reducer sample
````
export const setValue = (value, index, name) => ({
  type: SET_VALUE,
  value,
  componentKey: index,
  name
})
...
const reducer = (state = OrderedMap(), action) => {
                    ...
    case INSERT_AFTER:
        itemsBefore = state.takeUntil(({key}) => key === action.afterKey)
        const after = state.get(action.afterKey)
        itemsAfter = state.skipUntil(({key}) => key === action.afterKey)
                              .delete(action.afterKey)
      return itemsBefore             
        .set(action.afterKey, after) 
        .set(action.actionKey, {   
          type: action.objectType,
          key: action.actionKey,
        })
        .merge(itemsAfter)    
            ...

    case SET_VALUE:
    case CHANGE_TYPE:
      return state.update(action.componentKey, item => itemReducer(item, action))
    
    default: return state
         }
    }
...

function itemReducer(item = {}, action) {
  const {type} = action
  if (type === SET_VALUE)
    return {...item, value: action.value, name: action.name}
  if (type === CHANGE_TYPE)
    return {...item, type: action.objectType}
  return item
}
````
Firebase sample
```
-Screenplays
    -L-Pdurudnr1DSlx08BO
        -actionKey: "-L-Pdurudnr1DSlx08BO"
        -componentKey: "-L-O8hlCEDLV_z3CPTYm" // each unqic action may share same componentKey
        -name: "GZ"
        -type: "SET_VALUE"
        -value: ""One of our biggest challenges was..."
-Users
    -xOedKRr8zoVvKzhgby1xx0 //user's auth id
    -contributedScreenPlays: "Demo Day"
    -displayName: "Guang Zhu"
    -permissions
    -photoURL:
```



 Get started:

```
git clone git@github.com:queerviolet/spark.git
cd spark
npm install
npx firebase init
npm start
```
