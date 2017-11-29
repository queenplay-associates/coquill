import React from 'react';
import {connect} from 'react-redux';

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
    return [...script.keys()].map((key) => {
        if (script.get(key).type === 'sceneHeading') { return <SceneHeading key={key} id={key} />}
        if (script.get(key).type === 'action') { return <Action key={key} id={key} />}
        if (script.get(key).type === 'character') { return <Character key={key} id={key} />}
        if (script.get(key).type === 'parenthetical') { return <Parenthetical key={key} id={key} />}
        if (script.get(key).type === 'dialogue') { return <Dialogue key={key} id={key} />}
        if (script.get(key).type === 'shot') { return <Shot key={key} id={key} />}
        if (script.get(key).type === 'transition') { return <Transition key={key} id={key} />}
        if (script.get(key).type === 'text') { return <Text key={key} id={key} />}
    })
}

export default connect(script => {
    return {script}
})(Script)