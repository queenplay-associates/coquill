import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setContent, setValue, insertAfter, removeObject} from '~/client/store/reducer';

import '~/public/assets/Components.css';

class Block extends Component {
    componentDidMount() {
        this.text.focus();
    }

    handleChange = evt => {
        this.props.setValue(evt.target.value)
    }

    handleKeyPress = evt => {
        if (evt.key !== 'Enter') return
        evt.preventDefault()
        this.props.insertNext()
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
                onKeyPress={this.handleKeyPress}
            />
        )
    }
}

export const Action = connect(
  (state, {id}) => state.get(id),
  (dispatch, {id}) => ({
    setValue(value) {
        return dispatch(setValue(value, id))
    },
    insertNext() {
        return dispatch(insertAfter('action', id))
    }
  })
)(Block)

export const Parenthetical = connect(
  (state, {id}) => state.get(id),
  (dispatch, {id}) => ({
    setValue(value) {
        return dispatch(setValue(value, id))
    },
    insertNext() {
        return dispatch(insertAfter('dialogue', id))
    }
  })
)(Block)

export const SceneHeading = connect(
  (state, {id}) => state.get(id),
  (dispatch, {id}) => ({
    setValue(value) {
        return dispatch(setValue(value, id))
    },
    insertNext() {
        return dispatch(insertAfter('action', id))
    }
  })
)(Block)

export const Text = connect(
  (state, {id}) => state.get(id),
  (dispatch, {id}) => ({
    setValue(value) {
        return dispatch(setValue(value, id))
    },
    insertNext() {
        return dispatch(insertAfter('text', id))
    }
  })
)(Block)

export const Dialogue = connect(
  (state, {id}) => state.get(id),
  (dispatch, {id}) => ({
    setValue(value) {
        return dispatch(setValue(value, id))
    },
    insertNext() {
        return dispatch(insertAfter('character', id))
    }
  })
)(Block)

export const Character = connect(
  (state, {id}) => state.get(id),
  (dispatch, {id}) => ({
    setValue(value) {
        return dispatch(setValue(value, id))
    },
    insertNext() {
        return dispatch(insertAfter('dialogue', id))
    }
  })
)(Block)

export const Shot = connect(
  (state, {id}) => state.get(id),
  (dispatch, {id}) => ({
    setValue(value) {
        return dispatch(setValue(value, id))
    },
    insertNext() {
        return dispatch(insertAfter('action', id))
    }
  })
)(Block)

export const Transition = connect(
  (state, {id}) => state.get(id),
  (dispatch, {id}) => ({
    setValue(value) {
        return dispatch(setValue(value, id))
    },
    insertNext() {
        return dispatch(insertAfter('sceneHeading', id))
    }
  })
)(Block)