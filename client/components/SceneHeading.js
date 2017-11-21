import React, {Component} from 'react';
import ReactQuill from 'react-quill'; // ES6

export default class SceneHeading extends Component {
  constructor(props) {
    super(props)
    this.state = { text: '' } // You can also pass a Quill Delta here
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.component.focus()
  }

  handleChange(value, delta) {
    this.setState({ text: value })
  }

  render() {
    return (
        <div>
            <ReactQuill 
                value={this.state.text}  
                onChange={this.handleChange}
                className="sceneHeading" 
                ref={component => this.component = component} />
        </div>
    )
  }
}