import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import '~/public/assets/Homepage.css'

const logo = 'https://img00.deviantart.net/3b69/i/2015/125/6/f/burnt_quill_s_cutie_mark_final_version_by_burntquill-d8j1is9.png';


class Navbar extends React.Component {
  
  render() {
  const logInStatus = this.props.logInStatus ? "Logout" : "Login"
    let navName
    //console.log("index", this.props.userName.indexOf(' '))
    
    (this.props.userName.indexOf(' ')>0) 
      ? navName = this.props.userName.substr(0, this.props.userName.indexOf(' '))
      : navName = this.props.userName

  return (<nav className="nav-bar">
    <NavLink to='/'>
      <img className="logo" src={logo} alt="logo" />
    </NavLink>
    <NavLink to=''><h3>{this.props.userName}</h3></NavLink>
    {/* <NavLink to='/about'><h3>About</h3></NavLink> */}
    <NavLink to='/screenplays'><h3>Screenplays</h3></NavLink>
    <NavLink to='/login'>
      <h3 className="login">{logInStatus}</h3>
    </NavLink>
  </nav>)
  }
}

export default Navbar