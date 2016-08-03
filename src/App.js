import React from 'react';
import classNames from 'classnames';
import HeaderConnector from './components/HeaderConnector';
import styles from './App.css';

function App() {
  return (
    <div>
      <HeaderConnector />
      <div className={classNames('container', styles.container)}>
        <h1>Zendesk + Auth0 + Webtask Fun</h1>
        <p>Welcome to this beautiful app</p>
      </div>
    </div>
  );
}

export default App;
