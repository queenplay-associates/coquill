import React, {Component} from 'react';
import {Container, Dialogue, Character} from './';

export default class Editor extends Component {
    constructor() {
        super()
        this.state = {
            components: []
        }
        console.log('THE STATE', this.state)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        console.log('THE STATE', this.state)
        const newComponent = {type: event.target.value}
        const newStateOfComponent = this.state.components;
        newStateOfComponent.push(newComponent);
        this.setState({ components: newStateOfComponent })
    }

  render() {
      console.log('TYPE COMPONENTS', typeof this.state.components)
    return (
        <div>
            <nav>
                <button type="button"
                    onClick={this.handleChange} value ="dialogue" >Dialogue</button> 
                <button type="button"
                    onClick={this.handleChange} value ="character" >Character</button> 
            </nav>
            {this.state.components && this.state.components.map((component, i) =>
                {
                console.log("mapped component", component.type)    
                if (component.type === "dialogue") return <Dialogue key={i} />;
                if (component.type === "character") return <Character key={i} />;
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