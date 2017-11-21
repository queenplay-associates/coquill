import React, {Component} from 'react';
import {Dialogue, Character, SceneHeading} from './';

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
                    onClick={this.handleChange} value ="parenthetical">Action</button>
                <button type="button"
                    onClick={this.handleChange} value ="dialogue">Dialogue</button> 
                <button type="button"
                    onClick={this.handleChange} value ="action">Action</button>   
            </nav>
            {this.state.components && this.state.components.map((component, i) =>
                {   
                if (component.type === "dialogue") return <Dialogue key={i} />;
                if (component.type === "character") return <Character key={i} />;
                if (component.type === "sceneHeading") return <SceneHeading key={i} />;
                if (component.type === "action") return <Action key={i} />;
                if (component.type === "parenthetical") return <Parenthetical key={i} />;
                })
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