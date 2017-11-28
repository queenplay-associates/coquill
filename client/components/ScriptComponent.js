import React, {Component} from 'react';
import QuillEditor from './QuillEditor';
import {connect} from 'react-redux';
import {setContent, setValue} from '~/client/store/reducer';

class ScriptComponent extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.props.setValue(value);
  }

  quillDidMount = quill => {
    this.quill = quill;
    this.editor = quill.getEditor();
  }

  render() {
    return (
      <div>
        <QuillEditor
            ref={this.quillDidMount}
            //ref={ el => this.reactQuillRef = el}
            defaultValue=''
            onChange={this.handleChange}
            className={this.props.type}
        />
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
    setValue(value) {
      return dispatch(setValue(value, id))
    }
  })
)(ScriptComponent)
