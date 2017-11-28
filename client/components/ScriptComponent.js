import React, {Component} from 'react';
import ReactQuill from 'react-quill'; // ES6
import {connect} from 'react-redux';
import {setContent, applyDelta} from '~/client/store/reducer';
import Delta from 'quill-delta';
import fire from '~/public/secrets';
const db = fire.database().ref('screenplay');

class ScriptComponent extends Component {
  constructor(props) {
    super(props)
    //Quill props
    this.quillRef = null;
    this.reactQuillRef = null;
    this.attachQuillRefs = this.attachQuillRefs.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }


  doc = new Delta;
  
  deltaFilter(delta) {
    const {quill, editor} = this;
    if (quill.isEqualValue(delta, quill.lastDeltaChangeSet)) {
      this.doc = editor.getContents();
      return
    }
    this.doc = this.doc.compose(delta);
    editor.setContents(this.doc, 'silent')
  }

  handleChange(value) {
    this.props.applyDelta(value);
  }

  attachQuillRefs() {
    if (typeof this.reactQuillRef.getEditor !== 'function') return
    const quillRef = this.reactQuillRef.getEditor();
    if(quillRef) { this.quillRef = quillRef };
  }

  quillDidMount = quill => {
    this.quill = quill;
    this.editor = quill.getEditor();
  }

  render() {
    return (
      <div>
        {/* <QuillEditor */}
         <ReactQuill
            ref={this.quillDidMount}
            //ref={ el => this.reactQuillRef = el}
            defaultValue={this.props.delta}
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
    applyDelta(value) {
      return dispatch(applyDelta(value, id))
    }
  })
)(ScriptComponent)
