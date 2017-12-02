import React, { Component } from 'react'
import '~/public/assets/Buttons.css';
import { Link } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import '~/public/assets/Screenplays.css'

import { db } from '~/public/secrets'
// list short description (?)
// make a func to get rid of last comma of authors array
// what about anon users?

export default class Screenplays extends Component {
  constructor() {
    super()
    this.state = {
      value: '',
      screenplays: []
    }
  }

  componentDidMount() {
    db.ref('screenplays').on('child_added', snap => {
     this.setState({screenplays: [...this.state.screenplays, snap.key]})
    })
  }

  handleChange = evt => {
    this.setState({value: evt.target.value})
  }

  handleSubmit = () => { //Eleni, don't deconstruct this function! don't break it!
    const { value } = this.state,
            history = createHistory();
    history.push(`/screenplays/${value}`)
  }

  render() {
    const { screenplays, value } = this.state;

    return <div className="list-of-screenplays">
        <h1 className="screenplays-header">Screenplays</h1>
        <ul>
          {screenplays.length > 0 && screenplays.map((name, i) =>
            <li key={i}>
              <Link key={i} to={`/screenplays/${name}`}>{name}</Link>
            </li>
          )}
            <form className='input-container' onSubmit={this.handleSubmit}>
              <input value={value} onChange={this.handleChange}/>
              <button type='submit'>Create</button>
            </form>
        </ul>
      </div>
  }
}