import React, {Component} from 'react';
import ScriptComponent from './ScriptComponent';
import fire from '~/public/secrets';
import store from '~/client/store/index'

export default class Editor extends Component {
  constructor() {
    super();
    this.state = { 
      screenplay: {},
      components: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const db = fire.database().ref().child('screenplay');

    db.on('value', snap => {
      let newComponent = [];
      if(snap.val()) {
        for (var snapVal in snap.val()) {
          if(snap.val()[snapVal].type === "PUSH") {
          newComponent.push(snap.val()[snapVal].objectType);
          }
        }
      }
      this.setState({ 
        screenplay: snap.val(), 
        components: newComponent
      })
      console.log("SCREENPLAY", this.state.screenplay)
      console.log("COMPONENTS", this.state.components)
    });

    // db.on('child_removed', snap => {
    //  console.log('child element removed ---> val =', snap.val())
    // })
  }

  handleChange(evt) {
    // for rendering the components
    // const newStateOfComponent = this.state.components;
    // newStateOfComponent.push({type: evt.target.value});
    // this.setState({ components: newStateOfComponent })

    store.dispatch({type: 'PUSH', objectType: evt.target.value})
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