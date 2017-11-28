import React from 'react';
import {connect} from 'react-redux';

import SceneHeading from './scriptComponents/SceneHeading';
import Action from './scriptComponents/Action';
import Character from './scriptComponents/Character';
import Parenthetical from './scriptComponents/Parenthetical';
import Dialogue from './scriptComponents/Dialogue';
import Shot from './scriptComponents/Shot';
import Transition from './scriptComponents/Transition';
import Text from './scriptComponents/Text';

const Script = ({script, store}) => {
    console.log("SCRIPT", ...script)
    console.log("store", store)

    return [...script.keys()].map((key) => {
        console.log("key", key)
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

export default connect(script => ({script}))(Script)
