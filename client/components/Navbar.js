import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import './Navbar.css'

const logo = 'http://www.emoji.co.uk/files/mozilla-emojis/animals-nature-mozilla/11611-fire.png';



const Navbar = (props) => {

    const logInStatus = props.logInStatus ? "Log out" : "Log in"
    console.log("logInStatus---->", logInStatus)

    return <nav className="nav-bar">
      <NavLink to='/'>home
      </NavLink>
      <NavLink to='/about'><h3>About</h3></NavLink>
      <NavLink to='/screenplays'><h3>Screenplays</h3></NavLink>
      <NavLink to='/login'>
        <h3 className="login">{logInStatus}</h3>
      </NavLink>
    </nav>
}

export default Navbar
