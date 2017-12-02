/* eslint-disable */
import React, { Component } from 'react'
import firebase from 'firebase'
import { checkUser } from './authHelper'
// import createHistory from 'history/createBrowserHistory';

//TODO: reduce ref to a var and reuse it

export default class Auth extends Component {
    constructor(props) {
        super(props);
        const { userName, userFace } = props;
        this.state = { userName, userFace };
    }

    componentDidMount() {
        this.props.db.ref('users').on('value', snap => {
          // we're not doing anything here yet
        })
    }

    handleGoogleClick = evt => {
        evt.preventDefault()
        const provider = new firebase.auth.GoogleAuthProvider()

        firebase.auth().signInWithPopup(provider).then(result => {
            const token = result.credential.accessToken;
            return result.user;
        })
        .then(user => {
            let email = user.email,
                registeredUser = false,
                ref;

            firebase.database().ref('users').once("value", snap => {
                ref = snap.ref

                for (const prop in snap.val()) {
                    let emailExists = snap.val()[prop].email

                    if (emailExists === email) {
                        registeredUser = true
                        break
                    }
                }
            })

            return [registeredUser, user, ref]
        })
          .then(data => {
            if (!data[0]) registerUser(data[1], data[2])
            // refactor above if statement to check whether user exists then add to db
          })
          .catch(err => console.error(err))

        const registerUser = (data, ref) => {
            const { email, displayName, photoURL, uid } = data
            const permissions = [
                { id: 'blah', access: 'read' },
                { id: 'screen', access: 'admin' }
            ]

            ref.update({
              [uid]: {
                email,
                displayName,
                photoURL,
                permissions
            }})
        }
    }

    handleAnonymousClick = evt => {
        evt.preventDefault()
        //FIXME: this can be a promise thing
        firebase.auth().signInAnonymously()
          .then(firebase.auth().onAuthStateChanged(user => {
                let isAnonymous, uid;

                user
                    ? (isAnonymous = user.isAnonymous,
                        uid = user.uid)
                    :
                        "Stranger"
            })
        ).catch(function (error) {
            console.log(error.code, error.message)
        })
    }

    handleSignOutClick = evt => {
        // evt.preventDefault()
        firebase.auth().signOut().then(() => {
            this.setState({ userName: "Stranger", userFace: "" })
            console.log("user signed out 7890")
        }, error => { });
        // const history = createHistory();
        // history.push(`/`);
        console.log("user signed out 1234");
    }

    render() {
        const { status } = this.props
        const { userName, userFace } = this.state
        return (<div className="Auth">
            <p>Login Page</p>
            <h1>Hello, {userName}!</h1>
            <button onClick={this.handleAnonymousClick}> Sign in as Anonymous 🤣 </button>
            <button onClick={this.handleGoogleClick}> Sign in with Google 🤣 </button>
            <button onClick={this.handleSignOutClick}> Log out 🤣 </button>
            <img className="userFace" src={userFace} />
        </div>
    }
}