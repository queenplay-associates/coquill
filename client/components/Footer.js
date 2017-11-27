import React, { Component } from 'react';
import {
  EntypoFacebookWithCircle,
  EntypoGithubWithCircle,
  EntypoInstagramWithCircle,
  EntypoTwitterWithCircle,
  EntypoMailWithCircle
} from 'react-entypo';

export default class Footer extends Component {
  render() {
    return <div className="footer">
      <span>&copy; 2017 Coquill</span>
      <span>
        <EntypoFacebookWithCircle/>
        <EntypoInstagramWithCircle/>
        <EntypoTwitterWithCircle/>
        <EntypoGithubWithCircle/>
        <EntypoMailWithCircle/>
      </span>
    </div>
  }
}