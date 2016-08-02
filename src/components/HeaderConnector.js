import React, { Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import authService from '../utils/authService';
import Header from './Header';

class HeaderConnector extends Component {

  state = { profile: null };

  componentDidMount() {
    // @todo this is done to refresh the header for now. Will disappear when moving to redux
    authService.on('profile_updated', (profile) => {
      this.setState({ profile });
    });
  }

  shouldComponentUpdate = shouldPureComponentUpdate;

  componentWillUnmount() {
    authService.off('profile_updated');
  }

  onLoginClick = (e) => {
    e.preventDefault();
    authService.login();
  };

  onLogoutClick = (e) => {
    e.preventDefault();
    authService.logout();
  };

  render() {
    return (
      <Header onLoginClick={this.onLoginClick} onLogoutClick={this.onLogoutClick} isLoggedIn={authService.isLoggedIn()} />
    );
  }
}

export default HeaderConnector;
