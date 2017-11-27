import React, {Component} from 'react';
import ReactQuill from 'react-quill'; // ES6
import {connect} from 'react-redux'
import {setContent, applyDelta} from '~/client/store/reducer'

class ScriptComponent extends Component {
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
    this.props.applyDelta(delta)
  }

  render() {
    return (
      <div>
         <ReactQuill 
            value={this.props.delta}
            onChange={this.handleChange} 
            className={this.props.type}
            ref={component => this.component = component }/>
     </div>
    )
  }
}

export default connect(
  (state, {id}) => state.get(id),
  (dispatch, {id}) => ({
    setContent(content) {
      return dispatch(setContent(content, id))
    },
    applyDelta(delta) {
      return dispatch(applyDelta(delta, id))
    }
  })
)(ScriptComponent)