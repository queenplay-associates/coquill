import React, {Component} from 'react';
import ScriptComponent from './ScriptComponent';
import fire from '~/public/secrets';

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

    return (
      <div>
        <h1> 🔥 Ready. </h1>
        <h2>{content}</h2>
        <nav>
          <button type="button"
                  onClick={this.handleChange}
                  value ="sceneHeading">Scene Heading</button>
          <button type="button"
                  onClick={this.handleChange}
                  value ="character">Character</button>
          <button type="button"
                  onClick={this.handleChange}
                  value ="parenthetical">Parenthetical</button>
          <button type="button"
                  onClick={this.handleChange}
                  value="dialogue">Dialogue</button>
          <button type="button"
                  onClick={this.handleChange}
                  value ="action">Action</button>
          <button type="button"
                  onClick={this.handleChange}
                  value ="transition">Transition</button>
          <button type="button"
                  onClick={this.handleChange}
                  value ="shot">Shot</button>
          <button type="button"
                  onClick={this.handleChange}
                  value ="text">Text</button>
        </nav>
        {this.state.components && this.state.components.map((component, i) =>
        { return <ScriptComponent key={i} type={component.type}/>; })}
      </div>
    );
  }
}

// DROP DOWN
            // <select onChange={this.handleChange}>
            //     <option value="">Select</option>
            //     <option value ="dialogue">Dialogue</option>
            //     <option value ="character">Character</option>
            // </select>