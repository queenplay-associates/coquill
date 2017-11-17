import React, {Component} from 'react';
import {Dialogue, Character} from './'

export default class Container extends Component {

    render() {
        return (
            <div>
                CONTAINER IS RENDERING
                {this.props.insert === "dialogue" && <Dialogue />}
                {this.props.insert === "character" && <Character />}
            </div>
        )
    }
}