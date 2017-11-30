import React, { Component } from 'react'
import '~/public/assets/Buttons.css';
import { Link } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import '~/public/assets/Screenplays.css'

import { db } from '~/public/secrets'
// grab screenplays from database
  // list id, title, owners, short description (?)
  // make a func to get rid of last comma of authors array
  // what about anon users?
  // grab elements properly (map prob won't work here)

    // db.ref('screenplays').map(screenplay =>
    //   <div>
    //     <h3>{`${screenplay.id}. ${screenplay.title.toUpperCase()}`}</h3>
    //     <h6>{`Screenplay by ${screenplay.authors.join(', ').trim()}`}</h6>
    //   </div>
    // )

export default class Screenplays extends Component {
  constructor() {
    super()
    this.state = {
      value: '',
      screenplays: []
    }
  }

  componentDidMount() {
    db.ref('screenplays').on('child_added', snapshot => {
     this.setState({screenplays: [...this.state.screenplays, snapshot.key]})
    })
  }

  handleChange = evt => {
    this.setState({value: evt.target.value})
  }

  handleSubmit = evt => {
    // evt.preventDefault()
    const { value } = this.state,
            history = createHistory();
    history.push(`/screenplays/${value}`)
  }

  render() {

    return <div className = "demo">
        <h3>List of Screenplays</h3>
        <ul>
          {this.state.screenplays.length > 0 && this.state.screenplays.map(name => <li><Link to={`/screenplays/${name}`}>{name}</Link></li>)}
          <li>
            <form onSubmit={this.handleSubmit}>
              <input className='input' onChange={this.handleChange} value={this.state.value} />
            <button type='submit'>Create</button></form>
          </li>
        </ul>
      </div>
  }
}