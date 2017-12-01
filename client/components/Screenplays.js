import React, { Component } from 'react'
import '~/public/assets/Buttons.css';
import { Link } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import '~/public/assets/Screenplays.css'

import { db } from '~/public/secrets'
// grab screenplays from database
  // list title, owners, short description (?)
  // make a func to get rid of last comma of authors array
  // what about anon users?
  // grab elements properly (map prob won't work here)

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

  handleSubmit() {
    const { value } = this.state,
            history = createHistory();
    history.push(`/screenplays/${value}`)
  }

  render() {
    const { screenplays, value } = this.state;

    return <div className = "demo">
        <h3>List of Screenplays</h3>
        <ul>
          {screenplays.length > 0 && screenplays.map((name, i) =>
            <li>
              <Link key={i} to={`/screenplays/${name}`}>{name}</Link>
            </li>
          )}
          <li>
            <form onSubmit={this.handleSubmit}>
              <input className='input'
                     onChange={this.handleChange}
                     value={value}/>
              <button type='submit'>Create</button>
            </form>
          </li>
        </ul>
      </div>
  }
}