import React, { Component } from 'react';
import fire from './public/app';

// export default () => '🔥 Ready.'

export default class App extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    // Get elements
    const pObj = document.getElementById('object');

    // Create references
      // reference refers to the root of the database
      // child adds a child to the object root
    const db = fire.database().ref().child('object');
    //console.log('db:',fire.database().ref('coquill-e559a'));

    // Sync object changes
    db.on('value', snap => console.log('hello?',snap.val()));
  }

  render() {
    return (
      <div>
        <p> 🔥 Ready. </p>
      </div>
    );
  }
}