/* eslint-disable */
import React, { Component } from 'react'
import firebase from 'firebase'
import { checkUser } from './authHelper'
// import createHistory from 'history/createBrowserHistory';

//TODO: reduce ref to a var and resue it 

export default class Auth extends Component {
    constructor(props) {
        super(props);
        const { userName, userFace } = props;
        this.state = { userName, userFace };
    }
    componentDidMount(){
        this.props.db.ref('users').on('value', snapshot => {         
        })
    }

    handleGoogleClick = evt => {
        evt.preventDefault()
        const provider = new firebase.auth.GoogleAuthProvider()

        firebase.auth().signInWithPopup(provider).then(result => {
            const token = result.credential.accessToken;
            const user = result.user;
            return user
        })
        .then(user => {
            let email = user.email
            let bool = false    //FIXME: change name    
            let ref ;    
            firebase.database().ref('users').once("value", snapshot => {
                ref = snapshot.ref
                for (const prop in snapshot.val()) {
                    let existatedEmail = snapshot.val()[prop].email
                    if (existatedEmail === email) {
                        bool = true
                        break
                        }
                    }
                 })
                return [bool, user, ref]
             })
          .then(data => {
            if (!data[0]) regiesterUser(data[1], data[2]) // refactor this check if user exists or not then add to db
        }).catch()

        const regiesterUser = (data, ref) => {
            const { email, displayName, photoURL, uid } = data
            const permissions = [
                { id: 'blah', access: 'read' },
                { id: 'screen', access: 'admin' }
            ]
            ref.update({[uid]: {
                email,
                displayName,
                photoURL,
                permissions
            } })
        }
    }

    handleAnonymousClick =evt => {
        evt.preventDefault()
        //FIXME: this can be a promise thing
        firebase.auth().signInAnonymously().then(
            firebase.auth().onAuthStateChanged(function (user) {
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
        )
    }
}