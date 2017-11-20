import React, {Component} from 'react';
import ReactQuill from 'react-quill'; // ES6
import reducer from '~/client/store/reducer'

export default class Dialogue extends Component {
  constructor(props) {
    super(props)
    this.state = { text: '' } // You can also pass a Quill Delta here
    this.handleChange = this.handleChange.bind(this)
    console.log('the props', props)
  }

  handleChange(value, delta) {
    this.setState({ text: value })
    // console.log('EDITOR', this.editor)
    // var delta = this.editor.editor.getContents()
    console.log('DELTAAA', delta)
    
    console.log('the state', this.state)
  }

  render() {
    return (
      <div>
        DIALOGUE IS RENDERING
      <ReactQuill 
        value={this.state.text}  
        onChange={this.handleChange} />
        </div>
    )
  }
}