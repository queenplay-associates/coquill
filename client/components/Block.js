import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setContent, setValue, insertAfter, removeObject } from '../store/reducer'

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

            const nameid = user.displayName;
            const initials = nameid.indexOf(' ')
            ? nameid.charAt(0).toUpperCase() + nameid.charAt(nameid.indexOf(' ')+1).toUpperCase()
            : nameid.charAt(0).toUpperCase();

            const name = user.isAnonymous
              ? '🤷🏻‍'
              : initials

            this.setState({
              loginStatus: true,
              userName: name,
              faceUrl: user.photoURL
            })
          })
    }

    handleChange = evt => {
        const { setValue } = this.props,
              { userName } = this.state;
      
        setValue(evt.target.value, userName)
    }

    handleKeyPress = evt => {
        const { insertNext, deleteObject } = this.props;

        if (evt.keyCode === 9) evt.preventDefault()

        if (evt.key === 'Enter') {
            evt.preventDefault()
            insertNext()
        }

       if (evt.keyCode == 9) { //keydown of tab
        this.setState({showWriter: !this.state.showWriter})
        console.log('THE SHOWWRITER', this.state.showWriter)
       }

        if (evt.keyCode === 8 && evt.target.value.length === 0) {
            deleteObject()
        }
    }

    render() {
        const {value = '', name, type } = this.props;
        return <div className="tooltip">
          {this.state.showWriter && <span className="tooltipauthor">{name}</span>}
          <textarea
                  ref={name => this.text = name}
                  value={value}
                  onChange={this.handleChange}
                  className={type}
                  rows={value.length/75 + 1}
                  onKeyDown={this.handleKeyPress}
              />
            <span className="tooltiptext">{type}</span>
          </div>
    }
}

export const Action = connect(
  (state, {id}) => state.get(id),
  (dispatch, {id}) => ({
    setValue(value, userName) {
        return dispatch(setValue(value, id, userName))
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
    setValue(value, userName) {
        return dispatch(setValue(value, id, userName))
    },
    insertNext() {
        return dispatch(insertAfter('dialogue', id))
    },
    deleteObject() {
      return dispatch(removeObject(id))
    }
  })
)(Block)
//did not added username to action following
export const SceneHeading = connect(
  (state, {id}) => state.get(id),
  (dispatch, {id}) => ({
    setValue(value, userName) {
        return dispatch(setValue(value, id, userName))
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
    setValue(value, userName) {
        return dispatch(setValue(value, id, userName))
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
    setValue(value, userName) {
        return dispatch(setValue(value, id, userName))
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
    setValue(value, userName) {
        return dispatch(setValue(value, id, userName))
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
    setValue(value, userName) {
        return dispatch(setValue(value, id, userName))
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
    setValue(value, userName) {
        return dispatch(setValue(value, id, userName))
    },
    insertNext() {
        return dispatch(insertAfter('sceneHeading', id))
    },
    deleteObject() {
      return dispatch(removeObject(id))
    }
  })
)(Block)