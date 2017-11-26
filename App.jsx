import React, { Component } from 'react';
import fire from './public/secrets';
import store from '~/client/store/index'

export default class App extends Component {
  constructor() {
    super();
    this.state = { screenplay: {} };
  }

componentDidMount() {
  const db = fire.database().ref().child('screenplay');

  db.on('value', snap => {
    this.setState({ screenplay: snap.val()})
  });

  // db.on('child_removed', snap => {
  //  console.log('child element removed ---> val =', snap.val())
  // })
}

render() {
  const content = JSON.stringify(this.state.screenplay, null, 3),
    changedFire = JSON.stringify(this.state.screenplay.key, null, 3);


  return (
    <div>
      <h1> 🔥 Ready. </h1>
      <h2>{content}</h2>
      <p>🔥{changedFire}🔥</p>
    </div>
  );
}
}
