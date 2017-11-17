import React, {Component} from 'react';
import {Container, Dialogue, Character} from './';

export default class Editor extends Component {
    constructor() {
        super()
        this.state = {
            component: ''
        }
        console.log('THE STATE', this.state)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        console.log('THE EVENT', event.target.value)
        this.setState({component: event.target.value})
        console.log('THE STATE AGAIN', this.state)
    }

  render() {
    return (
        <div>
            <nav>
                <button type="button"
                    onClick={this.handleChange} value ="dialogue">Dialogue</button> 
                <button type="button"
                    onClick={this.handleChange} value ="character">Character</button> 
            </nav>
            <Container insert={this.state.component} />
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