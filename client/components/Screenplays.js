import React, { Component } from 'react'
// import { db } from '~/public/secrets'
import '~/public/assets/Buttons.css';
import { Link } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

// grab screenplays from database
  // list id, title, owners, short description (?)
  // make a func to get rid of last comma of authors array
  // what about anon users?
  // grab elements properly (map prob won't work here)

export default class Screenplays extends Component {
  constructor() {
    super()
    this.state = {
      value: ''
    }
  }

  handleChange = evt => {
    this.setState({value: evt.target.value})
    console.log('input value', evt.target.value)
  }

  handleSubmit = evt => {
    // evt.preventDefault()
    const { value } = this.state,
            history = createHistory();
    console.log('input value', value)
    history.push(`/screenplays/${value}`)
  }

  render() {
    return <div className = "demo">
        <h3>List of Screenplays</h3>
        <ul>
          <li><Link to='/screenplays/hop'>Hop</Link></li>
          <li><Link to='/screenplays/her'>Her</Link></li>
          <li><form onSubmit={this.handleSubmit}><input onChange={this.handleChange} value={this.state.value} /></form></li>
        </ul>
      </div>
  }
}