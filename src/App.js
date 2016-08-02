import React, { Component } from 'react';
import classNames from 'classnames';
import shouldPureComponentUpdate from 'react-pure-render/function';
import HeaderConnector from './components/HeaderConnector';
import styles from './App.css';

class App extends Component {

  shouldComponentUpdate = shouldPureComponentUpdate;

  render() {
    return (
      <div>
        <HeaderConnector />
        <div className={classNames('container', styles.container)}>
          <h1>Zendesk + Auth0 + Webtask Fun</h1>
          <p>You need to authenticate to manage your zendesk subscriptions</p>
        </div>
      </div>
    );
  }
}

export default App;
