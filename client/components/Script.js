import React from 'react'
import {connect} from 'react-redux'

import ScriptComponent from './ScriptComponent'

const Script = ({ids}) => {
    // console.log("SCRIPT", ...script);
    return [...ids].map((id) => {
        return <ScriptComponent 
            key={id} 
            id={id} />
    })
}

export default connect(script => ({ids: script.keys()}))(Script)
