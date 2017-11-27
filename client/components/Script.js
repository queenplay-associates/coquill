import React from 'react'
import {connect} from 'react-redux'

import ScriptComponent from './ScriptComponent'

const Script = ({script}) => {
    console.log("SCRIPT", ...script);
    return [...script].map((key) => {
        console.log("deltas in script", key)
        return <ScriptComponent key={key} id={key} />
    }
    )
}

export default connect(script => ({script}))(Script)
