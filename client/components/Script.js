import React from 'react'
import {connect} from 'react-redux'

import ScriptComponent from './ScriptComponent'

const Script = ({script}) =>
    [...script.keys()].map(key =>
        <ScriptComponent key={key} id={key} />
    )

export default connect(script => ({script}))(Script)