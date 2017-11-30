var firebase = require("firebase");

export const checkUser = (uid) => 
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.setState({ loginStatus: true, userName: user.displayName })
          console.log("user---->", name, user)
        } else {
          // No user is signed in.
        }
   })


