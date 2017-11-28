import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setContent, setValue, insertAfter} from '~/client/store/reducer';

class Action extends Component {

    componentDidMount() {
        this.text.focus();
    }

    handleChange = evt => {
        console.log("insert before action ----->",this.props.id)
        if(evt.target.value.includes('\n')) {this.props.insertAfter('action', this.props.id)}
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
    },
    insertAfter(type, key) {
        return dispatch(insertAfter(type, key))
    }
  })
)(Action)
