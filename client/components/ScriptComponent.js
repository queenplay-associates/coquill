import React, {Component} from 'react';
import ReactQuill from 'react-quill'; // ES6
import store from '~/client/store/index';
//import applyDelta 

export default class ScriptComponent extends Component {
  constructor(props) {
    super(props)
    this.state = { content: '' } // You can also pass a Quill Delta here
    this.handleChange = this.handleChange.bind(this)
    console.log("PROPS", this.props)
  }

  componentDidMount() {
    this.component.focus()
  }

  handleChange(value, delta) {
    //this.setState({ content: value })
    console.log("THIS PROPS", this.props)
    this.props.store.dispatch(applyDelta(delta, this.props.index))
  }

  render() {
    return (
      <div>
         <ReactQuill 
            value={this.state.content}  
            onChange={this.handleChange} 
            className={this.props.type}
            ref={component => this.component = component }/>
     </div>
    )
  }
}
