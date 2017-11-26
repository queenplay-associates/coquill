import React, {Component} from 'react';
import ReactQuill from 'react-quill'; // ES6
import store from '~/client/store/index';

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
    this.setState({ content: value })
    store.dispatch({type: 'APPLY_DELTA', objectType: this.props.type, componentKey: this.props.index, content: value})
    console.log("DELTA", delta)
    console.log("VALUE", value)
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