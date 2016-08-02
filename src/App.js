import React, { Component } from 'react';
import classNames from 'classnames';
import shouldPureComponentUpdate from 'react-pure-render/function';
import authService from './utils/AuthService';
import Header from './Header';
import styles from './App.css';

class App extends Component {

  shouldComponentUpdate = shouldPureComponentUpdate;

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
      <div>
        <Header onLoginClick={this.onLoginClick} onLogoutClick={this.onLogoutClick} isLoggedIn={authService.isLoggedIn()} />
        <div className={classNames('container', styles.container)}>
          <h1>Zendesk Subscriptions</h1>
        </div>
      </div>
    );
  }
}

export default App;
