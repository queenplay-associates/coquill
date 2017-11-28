import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setContent, setValue} from '~/client/store/reducer';

class ScriptComponent extends Component {

  componentDidMount() {
    this.text.focus();
  }

  handleChange = evt => {
    if(evt.target.value.includes('\n')) { console.log("ENTER WAS HIT") }
    else {this.props.setValue(evt.target.value) }
  }

  render() {
    const {value = ''} = this.props;
    return (
    <textarea
            ref={name => this.text = name}
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
    setValue(value) {
      return dispatch(setValue(value, id))
    }
  })
)(ScriptComponent)
