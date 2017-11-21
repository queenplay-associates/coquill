import React, {Component} from 'react';
import ScriptComponent from './ScriptComponent';

export default class Editor extends Component {
    constructor() {
        super()
        this.state = {
            components: []
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        const newStateOfComponent = this.state.components;
        newStateOfComponent.push({type: event.target.value});
        this.setState({ components: newStateOfComponent })
    }

  render() {
    return (
        <div>
            <nav>
                <button type="button"
                    onClick={this.handleChange} value ="sceneHeading">Scene Heading</button>
                <button type="button"
                    onClick={this.handleChange} value ="character">Character</button>
                <button type="button"
                    onClick={this.handleChange} value ="parenthetical">Parenthetical</button>
                <button type="button"
                    onClick={this.handleChange} value ="dialogue">Dialogue</button>
                <button type="button"
                    onClick={this.handleChange} value ="action">Action</button>
                <button type="button"
                    onClick={this.handleChange} value ="transition">Transition</button>
                <button type="button"
                    onClick={this.handleChange} value ="shot">Shot</button>
                <button type="button"
                    onClick={this.handleChange} value ="text">Text</button>
            </nav>
            {this.state.components && this.state.components.map((component, i) =>
                { return <ScriptComponent key={i} type={component.type}/>; })
            }
        </div>
    )
  }
}

// DROP DOWN
            // <select onChange={this.handleChange}>
            //     <option value="">Select</option>
            //     <option value ="dialogue">Dialogue</option>
            //     <option value ="character">Character</option>
            // </select>