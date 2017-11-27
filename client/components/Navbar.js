import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

const logo = 'http://www.emoji.co.uk/files/mozilla-emojis/animals-nature-mozilla/11611-fire.png';

export default class Navbar extends Component {
  render() {
    return <nav className="nav-bar">
      <NavLink to='/'>
        <img className="logo"
             src={logo}
             alt="fire-logo"/>
      </NavLink>
      <NavLink to='/about'><h3>About</h3></NavLink>
      <NavLink to='/screenplays'><h3>Screenplays</h3></NavLink>
      <NavLink to='/login'>
        <h3 className="login">Login</h3>
      </NavLink>
    </nav>
  }
}