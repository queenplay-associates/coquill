import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader';
import App from '~/App'
import Editor from '~/client/components/Editor';
import Script from '~/client/components/Script';
import Auth from '~/client/components/Auth';
import {db} from '~/public/secrets'

import firebase from 'firebase';

//TODO: make this into a promise

const main = () => {
  render(
  <AppContainer>
    <Editor fireRef={db.ref('screenplays')}>
      <Script /> 
      <Auth  fireRef={db} userName={name}/>
    </Editor >
    {/*<App />*/}
  </AppContainer>,
  document.getElementById('main'))
}


firebase.auth().onAuthStateChanged(function(user) {
  if (user) { 
     let name = user.displayName || "Stranger"
     main(name)
    console.log("user---->", name, user)   
  } else {
    // No user is signed in.
  }
});

main();

module.hot && module.hot.accept('~/App', main);