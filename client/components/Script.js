import React from 'react'
import {connect} from 'react-redux'

import ScriptComponent from './ScriptComponent'

const Script = ({script}) => {
    console.log("SCRIPT", ...script);
    return [...script].map((elem) => {
        console.log("mapped keys", elem)
        return <ScriptComponent 
            key={elem[1].key} 
            id={elem[1].key} 
            delta={elem[1]}/>
    })
}

export default connect(script => ({script}))(Script)
