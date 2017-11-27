import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';
import ScriptComponent from './ScriptComponent';
import fire from '~/public/secrets';

import Navbar from './Navbar'
// import Footer from './Footer'

export default class Editor extends Component {
  constructor() {
    super();
    this.state = { screenplay: {} };
    this.handleChange = this.handleChange.bind(this);
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

  handleChange(evt) {
    const newStateOfComponent = this.state.screenplay;
    newStateOfComponent.push({type: evt.target.value});
    this.setState({ screenplay: newStateOfComponent })
  }

  render() {
    const content = JSON.stringify(this.state.screenplay, null, 3);

    const buttonTypes = [
      ['sceneHeading', 'Scene Heading'],
      ['character', 'Character'],
      ['parenthetical', 'Parenthetical'],
      ['dialogue', 'Dialogue'],
      ['action', 'Action'],
      ['transition', 'Transition'],
      ['shot', 'Shot'],
      ['text', 'Text']
    ];

    return (
      <div>
        <h1> 🔥 Ready. </h1>
        <h2>{content}</h2>
        <Navbar/>
        <Switch>
          {/*<Route path="/" component={Home} />*/}

        </Switch>
        <nav>
          {
            buttonTypes.map(elem => {
              return (
                <button key={elem[0]}
                        type="button"
                        onClick={this.handleChange}
                        value={elem[0]}>{elem[1]}
                </button>
              )
            })
          }
        </nav>
        {this.state.components && this.state.components.map((component, i) => {
          return <ScriptComponent key={i} type={component.type}/>;
        })}
        {/*<Footer />*/}
      </div>
    );
  }
}

// DROP DOWN
  // <select onChange={this.handleChange}>
  //     <option value="">Select</option>
  //     <option value="dialogue">Dialogue</option>
  //     <option value="character">Character</option>
  // </select>