/* eslint-disable */
import React, { Component } from 'react'
import firebase from 'firebase'
import { checkUser } from './authHelper'

import '~/public/assets/Homepage.css'

//TODO: reduce ref to a var and reuse it

const loginOption = { select : "Login Options",
                      google: "google",
                      anonymous : "anonymous",
                      logout : "logout"
                    }

export default class Auth extends Component {
    constructor(props) {
        super(props);
        const { userName, userFace } = props;
        this.state = { userName, userFace };
    }

    componentDidMount() {
        /*
        this.props.db.ref('users').on('value', snap => {
          // we're not doing anything here yet
        })
        */
    }

    handleGoogleClick = () => {
        //evt.preventDefault()
        const provider = new firebase.auth.GoogleAuthProvider()

        firebase.auth().signInWithPopup(provider)
          .then(result => {
            const token = result.credential.accessToken;
            return result.user;
          })
          .then(user => {
              let email = user.email,
                  registeredUser = false,
                  ref

              firebase.database().ref('users').once("value", snap => {
                  ref = snap.ref;

                  for (const prop in snap.val()) {
                      let emailExists = snap.val()[prop].email;

                      if (emailExists === email) {
                          registeredUser = true;
                          return;
                      }
                  }
              });
            return [registeredUser, user, ref]
        })
          .then(data => {
            console.log("ref after google---->", data)         
            if (!data[0] && !data[1]) registerUser(data[1], data[2])
            // refactor above if statement to check whether user exists then add to db
          })
          .catch(err => console.error(err));

        const registerUser = (data, ref) => {
            const { email, displayName, photoURL, uid } = data;
            const permissions = [
                { id: 'blah', access: 'read' },
                { id: 'screen', access: 'admin' }
            ];

            ref.update({
              [uid]: {
                email,
                displayName,
                photoURL,
                permissions
            }})
        }
    }

    handleAnonymousClick = () => {
        //FIXME: This logic is funny need to change it
        firebase.auth().signInAnonymously()
            .then(firebase.auth().onAuthStateChanged(user => {
                let isAnonymous, uid;
                user
                    ? (isAnonymous = user.isAnonymous,
                        uid = user.uid)
                    : "Stranger"
            }))
            .catch(err => console.log(err.code, err.message))
        }


    handleSignOutClick = () => {
        // evt.preventDefault()
        firebase.auth().signOut().then(() => {
            this.setState({ userName: "Stranger", userFace: "" })
        }, error =>  console.log(error.message));
    }

    loginSubmit = (opt) => {
        switch (opt) {
            case loginOption.google:
                this.handleGoogleClick()
            case loginOption.anonymous:
                this.handleAnonymousClick()
            case loginOption.logout:
                 this.handleSignOutClick()
                default:
                console.log("default---->")         
        }
    }

    render() {
        const { status } = this.props // FIXME: this might not be used?
        const { userName, userFace } = this.state
        return <div className="authSelect">
        <img className="userFace" src={userFace}/>
          <LogInSelect options={loginOption} loginSubmit={this.loginSubmit}/>
        </div>
    }
}


class LogInSelect extends Component {
    constructor(props){
        super(props)
    }
    select = evt => {
        this.props.loginSubmit(evt.target.value);
    }

    render(){
        let options = []
        for (let option in this.props.options) {
            let selectText = this.props.options[option]
            options.push(<option key={option} selected={option.value} value={option}>{selectText}</option>)
    }
    return (
            <form>
            <select onChange= {this.select} className="dropdown">
                {options}
            </select>
            </form>
        )}
}