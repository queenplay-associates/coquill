import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

const logo = 'https://vignette.wikia.nocookie.net/witcher/images/3/38/TW3_English_logo.png/revision/latest?cb=20150923154606';

export default class Navbar extends Component {
  render() {
    return <nav className="nav-bar">
      <NavLink to='/'>
        <img className="logo"
             src={logo}
             alt="coquill-logo"/>
      </NavLink>
      <NavLink to='/students'><h3>Students</h3></NavLink>
      <NavLink to='/teachers'><h3>Teachers</h3></NavLink>
      <NavLink to='/campuses'><h3>Login</h3></NavLink>
    </nav>
  }
}