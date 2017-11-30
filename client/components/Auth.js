/* eslint-disable */
import React, { Component } from 'react'
import firebase from 'firebase'
import { checkUser } from './authHelper'

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
            //console.log("uid----iO7oe8L7dKRr8zoVvKzyqhhgqby1----->>>>>", user.uid)
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
                    //console.log("----promise ===>", snapshot.val()[prop].email)
                    if (existatedEmail === email) {
                        bool = true
                        break
                        }
                    }
                 })
                return [bool, user, ref]
             })
          .then(data => {
            if (!data[0]) regiesterUser(data[1], data[2]) // refactor this
        }).catch()

        const regiesterUser = (data, ref) => {
            const { email, displayName, photoURL, uid } = data
            const permissions = [
                { id: 'blah', access: 'read' },
                { id: 'screen', access: 'admin' }
            ]
            ref.push({
                uid,
                email,
                displayName,
                photoURL,
                permissions
            }).catch(error => {
                console.log("error", error.code, error.message)
            });
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
            //console.error('Sign Out Error', error);
        });
    }

    render() {
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