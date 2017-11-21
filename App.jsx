import React, { Component } from 'react';
import fire from './public/secrets';
import { addChar } from '~/client/store/index'

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      screenplay: {}
    };
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    const db = fire.database().ref().child('screenplay')
        , scenes = db.child('scenes');

    db.on('value', snap => {
      this.setState({ screenplay: {
        scenes: snap.val()
      }})
    });

    scenes.on('child_added', snap => {
      this.setState({
        screenplay: {
          key: snap.val()
        }
      });
    });

    scenes.on('child_changed', snap => {
      this.setState({
        screenplay: {
          key: snap.val()
        }
      });
    });

    // scenes.on('child_removed', snap => {
    //  console.log('child element removed ---> val =', snap.val())
    // })
  }

  handleClick(e) {
    e.preventDefault()
    console.log('button clicked')
    const testType = {
      characters: {
        "character_1": {
          name: "Eleni"
        },
        "character_2": {
          "name": "Guang"
        }
    }}
    addChar(name)
  }

  render() {
    const content = JSON.stringify(this.state.screenplay, null, 3)
  , changedFire = JSON.stringify(this.state.screenplay.key, null, 3);

    return (
      <div>
        <h1> 🔥 Ready. </h1>
        {/* <button onClick={this.handleClick}>I am a button!!!</button> */}
        <h2>{content}</h2>
        <p>🔥{changedFire}🔥</p>
        
      </div>
    );
  }
}