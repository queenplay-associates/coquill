import React from 'react';
import { NavLink } from 'react-router-dom';

import '~/public/assets/Homepage.css'

const logo = 'https://img00.deviantart.net/3b69/i/2015/125/6/f/burnt_quill_s_cutie_mark_final_version_by_burntquill-d8j1is9.png';

const Navbar = (props) => {
    const logInStatus = props.logInStatus ? "Log out" : "Log in"
    console.log("logInStatus---->", logInStatus)

    return <nav className="nav-bar">
      <NavLink to='/'>
        <img className="logo" src={logo} alt="fire-logo"/>
      </NavLink>
      <NavLink to='/about'><h3>About</h3></NavLink>
      <NavLink to='/screenplays'><h3>Screenplays</h3></NavLink>
      <NavLink to='/login'>
        <h3 className="login">{logInStatus}</h3>
      </NavLink>
    </nav>;
}

export default Navbar
