import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setContent, setValue, insertAfter, removeObject } from '~/client/store/reducer'

import '~/public/assets/Components.css';
import firebase from 'firebase';

class Block extends Component {
    constructor(){
        super()
        this.state = {userName: '', showWriter: false}
    }

    componentDidMount() {    
        this.text.focus()
        //FIXME: put this into a helper file/ Eleni do not delete this yet! :D
        firebase.auth().onAuthStateChanged(user => {
            if (!user) return
            let name;
            user.isAnonymous
              ? name = 'Anonymous'
              : name = user.displayName
            this.setState({loginStatus: true, userName: name, faceUrl: user.photoURL})
          })
    }

    handleChange = evt => {
        this.props.setValue(evt.target.value)
    }

    handleKeyPress = evt => {
        if (evt.keyCode === 9) evt.preventDefault()
        if (evt.key === 'Enter') {
            evt.preventDefault()
            this.props.insertNext()
        }
        if (evt.keyCode == 32) {
            this.setState(prevState => ({
                showWriter: !prevState.showWriter
            }))
            console.log("down pressed who is editing--->", this.state.showWriter, this.state.userName)
            
        }

        if (evt.keyCode === 8 && evt.target.value.length === 0) {
            this.props.deleteObject()
        }
    }
    renderWriter(){
        this.setState({showWriter:!this.state.showWriter})
        return <p>{this.state.userName}</p>
    }

    render() {
        const {value = ''} = this.props;
        return ( 
            <div>
            <span>{this.state.showWriter ? this.state.userName : ""}...</span>
        <textarea
                ref={name => this.text = name}
                value={value}
                onChange={this.handleChange}
                className={this.props.type}
                rows={value.split('\n').length}
                onKeyDown={this.handleKeyPress}
            />
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