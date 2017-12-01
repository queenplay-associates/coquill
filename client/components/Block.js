import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setContent, setValue, insertAfter, removeObject } from '~/client/store/reducer'

import '~/public/assets/Components.css';

class Block extends Component {
    componentDidMount() {
        this.text.focus();
    }

    handleChange = evt => {
        this.props.setValue(evt.target.value)
        console.log("value", (evt.target.value).length)
        console.log("rows", evt.target.rows)
    }

    handleKeyPress = evt => {
        if (evt.keyCode === 9) evt.preventDefault()
        if (evt.key === 'Enter') {
            evt.preventDefault()
            this.props.insertNext()
        }

        if (evt.keyCode === 8 && evt.target.value.length === 0) {
            this.props.deleteObject()
        }
    }

    render() {
        const {value = ''} = this.props;
        return (
        <div className="tooltip">
            <textarea
                    ref={name => this.text = name}
                    value={value}
                    onChange={this.handleChange}
                    className={this.props.type}
                    rows={value.length/81 + 1}
                    onKeyDown={this.handleKeyPress}
                />
            <span className="tooltiptext">{this.props.type}</span>
        </div>
        )
    }
}

// const setVal = (dispatch, {id}) =>
//   setValue(val => dispatch(setValue(val, id)));

export const Action = connect(
  (state, {id}) => state.get(id),
  (dispatch, {id}) => ({
    setValue(value) {
        return dispatch(setValue(value, id))
    },
    insertNext() {
        return dispatch(insertAfter('action', id))
    },
    deleteObject() {
        return dispatch(removeObject(id))
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
    },
    deleteObject() {
      return dispatch(removeObject(id))
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
    },
    deleteObject() {
      return dispatch(removeObject(id))
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
    },
    deleteObject() {
      return dispatch(removeObject(id))
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
    },
    deleteObject() {
      return dispatch(removeObject(id))
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
    },
    deleteObject() {
      return dispatch(removeObject(id))
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
    },
    deleteObject() {
      return dispatch(removeObject(id))
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
    },
    deleteObject() {
      return dispatch(removeObject(id))
    }
  })
)(Block)