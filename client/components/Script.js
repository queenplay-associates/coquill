import React, {Component} from 'react'
import { connect } from 'react-redux'

import '~/public/assets/Buttons.css';

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

// const Script = ({script}) => {

class Script extends Component {

    constructor({ script }) {
        super({ script })

        this.state = { script }
    }

    componentWillReceiveProps() {
        var child = this.refs['child']
        console.log(childs)
    }

    render() {
        const {script}  = this.state;
        let i = 0;
        return [...script.keys()].map((key, index) => {
            console.log('the idx', script.get(key))
            const keyType = script.get(key).type;
            if (keyType === 'sceneHeading') {
                i++;
                return [<span className="sceneNumber">{i}</span>,
                    <SceneHeading key={key} id={key}/>]
            }
            if (keyType === 'action') return <Action key={key} id={key} ref={'child'} />
            if (keyType === 'character') return <Character key={key} id={key} />
            if (keyType === 'parenthetical') return <Parenthetical key={key} id={key} />
            if (keyType === 'dialogue') return <Dialogue key={key} id={key} />
            if (keyType === 'shot') return <Shot key={key} id={key} />
            if (keyType === 'transition') return <Transition key={key} id={key} />
            if (keyType === 'text') return <Text key={key} id={key} />
        })
    }
}

export default connect(script => {
    return {script}
})(Script)