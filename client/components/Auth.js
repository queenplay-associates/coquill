/* eslint-disable */
import React, { Component } from 'react'
import firebase from 'firebase'
import { checkUser } from './authHelper'

export default class Auth extends Component {
    constructor(props) {
        super(props);
        const { userName, userFace } = props;
        this.state = { userName, userFace };
    }
    componentDidMount(){
        this.props.fireRef.on('value', snapshot => {
           
        })
    }

    handleGoogleClick = evt => {
        evt.preventDefault()
        const provider = new firebase.auth.GoogleAuthProvider()
        
        firebase.auth().signInWithPopup(provider).then(result => {
            const token = result.credential.accessToken;
            const user = result.user;
            this.props.fireRef.once('value', snap => {
               // check (!user.uid) 
                const {email, displayName, photoURL} = user
                const permissions = [
                    {id: 'blah', access: 'read'},
                    {id: 'screen', access: 'admin'}
                ] // key or id
                snap.ref.push({
                    email,
                    displayName,
                    photoURL,
                    permissions
                })
            })

        }).catch(error => {
            console.log("error", error.code, error.message)
        });
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
                    console.log("user singed out")
            })
        ).catch(function (error) {
            console.log(error.code, error.message)
        })
    }

    handleSignOutClick = evt => {
        evt.preventDefault()
        firebase.auth().signOut().then(() => {
            this.setState({ userName: "Stranger", userFace: "" })
        }, error => {
            console.error('Sign Out Error', error);
        });
    }

    render() {
        //console.log("props-->", this.props)
        const { status } = this.props
        const { userName, userFace } = this.state

        return (<div className="Auth">
            <p>Auth Page Hello </p>
            <h1>{userName}</h1>
            <button onClick={this.handleAnonymousClick}> anonymous-auth 🤣 </button>
            <button onClick={this.handleGoogleClick}> google auth 🤣 </button>
            <button onClick={this.handleSignOutClick}> sign out 🤣 </button>
            <h1>🤷🏻‍{userName}</h1>
            <img className="userFace" src={userFace} />
        </div>
        )
    }
}