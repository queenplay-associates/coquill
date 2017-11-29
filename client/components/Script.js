import React from 'react'
import { connect } from 'react-redux'

import {
    SceneHeading,
    Action,
    Character,
    Parenthetical,
    Dialogue,
    Shot,
    Transition,
    Text
} from './Block';

const Script = ({script}) => {
    let i = 0;
    return [...script.keys()].map(key => {
        const keyType = script.get(key).type;
        if (keyType === 'sceneHeading') {
            i++;
          return <span className="sceneNumber">{i}
             <SceneHeading key={key} id={key}/>
          </span>
        }
        if (keyType === 'action') return <Action key={key} id={key} />
        if (keyType === 'character') return <Character key={key} id={key} />
        if (keyType === 'parenthetical') return <Parenthetical key={key} id={key} />
        if (keyType === 'dialogue') return <Dialogue key={key} id={key} />
        if (keyType === 'shot') return <Shot key={key} id={key} />
        if (keyType === 'transition') return <Transition key={key} id={key} />
        if (keyType === 'text') return <Text key={key} id={key} />
    })
}

export default connect(script => {
    return {script}
})(Script)