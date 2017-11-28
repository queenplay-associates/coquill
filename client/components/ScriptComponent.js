import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setContent, setValue} from '~/client/store/reducer';
//import Textarea from 'react-textarea-autosize';

class ScriptComponent extends Component {

  handleChange = evt =>
    this.props.setValue(evt.target.value)

  render() {
    const {value = ''} = this.props;
    return (
    <textarea
            value={value}
            onChange={this.handleChange}
            className={this.props.type}
            rows={value.split('\n').length}
          />
    )
  }
}



export default connect(
  (state, {id}) => state.get(id),
  (dispatch, {id}) => ({
    setContent(content) {
      return dispatch(setContent(content, id))
    },
    setValue(value) {
      return dispatch(setValue(value, id))
    }
  })
)(ScriptComponent)
