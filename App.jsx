import React, { Component } from 'react';
import fire from './public/secrets';

// export default () => '🔥 Ready.'
//{ "fire": 10, "fireworks": { "garden": 10, "livingRoom": 3 }, "match": 1, "spark": 3 }

export default class App extends Component {
  constructor() {
    super();
    this.state = {object: {
      "fire": "",
      "fireworks": {},
      "match": "",
       "spark": ""
    }}
  }

  componentDidMount() {
    // Get elements
    const pObj = document.getElementById('object');
    // Create references
      // reference refers to the root of the database
      // child adds a child to the object root
     //ref for object
    const db = fire.database().ref().child('object');
    //ref for fireworks
    const fireWorkRef = db.child('fireworks');


    //console.log('db:',fire.database().ref('coquill-e559a'));

    // Sync object changes
    db.on('value', snap => {
      //console.log('hello?', snap.val())
      this.setState({ object: snap.val() })
    });

    fireWorkRef.on('child_added', snap => this.setState({ object: {fireworks: snap.val()}}))

    fireWorkRef.on('child_changed', snap => console.log('child element changed ---> key ==', snap.key, 'val--=', snap.val()) )
    fireWorkRef.on('child_removed', snap => {
     console.log('child element removed ---> val =', snap.val())
    })

  }

  render() {
    const content = JSON.stringify(this.state.object ,null,3 )// Object.values(this.state.object)
    const changedFire = JSON.stringify(this.state.object.fireworks, null, 3)
    //console.log("---->",content)
    return (
      <div>
        <h1> 🔥 Ready. </h1>
        <h2>{content}</h2>
        <p>🔥{changedFire}🔥</p>
      </div>
    );
  }
}

/* NOTE-->
db ordered alphabetically
*/