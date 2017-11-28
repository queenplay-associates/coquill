/* eslint-disable */
import React, {Component} from 'react'
import firebase from 'firebase';
//import {db} from '~/public/secrets'
//FIXME: Uncoment out Editor.js line: 47 : passing fire ref as well.
//Not using props yet. 


class Auth  extends Component {  
    constructor(props) {
        super(props);
        this.handlanonymousClick = this.handlanonymousClick.bind(this)
        this.handlGoogleClick = this.handlGoogleClick.bind(this)      
    }
    //refactor 
    handlGoogleClick(evt){
        evt.preventDefault()  
        const provider = new firebase.auth.GoogleAuthProvider()

        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            console.log("user, token", user, token)
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            console.log("credential", credential)
            
            // ...
          });
        
      }

    handlanonymousClick(evt){
        evt.preventDefault()
        //FIXME: this can be a promise thing
        firebase.auth().signInAnonymously().then(
            firebase.auth().onAuthStateChanged(function (user) {
                console.log("user signInAnonymously", user)
                let isAnonymous, uid;
                user
                    ? (isAnonymous = user.isAnonymous,
                        uid = user.uid)
                    : //user singed out 
                    console.log("user singed out")
            })
        ).catch(function (error) {
            // Handle Errors here.
            console.log(error.code, error.message)
        })          
    }

    handlSingOUtClick(evt){
        evt.preventDefault()
        firebase.auth().signOut().then(function() {
            console.log('Signed Out');
          }, function(error) {
            console.error('Sign Out Error', error);
          });

    }

    render() {
        console.log("props-->", this.props)
        
       let {userName} = this.props

        return (<div className="Auth">
            <p>Auth Page Hello </p>
            <h1>{userName}</h1>
            <button onClick={this.handlanonymousClick}> anonymous-auth 🤣 </button>
            <button onClick={this.handlGoogleClick}> google auth 🤣 </button>   
            <button onClick={this.handlSingOUtClick}> sign out 🤣 </button>            
            
        </div>
        )
    }
}

export default Auth

