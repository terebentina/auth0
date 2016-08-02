import React, { Component } from 'react';
import classNames from 'classnames';
import shouldPureComponentUpdate from 'react-pure-render/function';
import Header from './Header';
import styles from './App.css';

class App extends Component {

  shouldComponentUpdate = shouldPureComponentUpdate;

  render() {
    return (
      <div>
        <Header />
        <div className={classNames('container', styles.container)}>
          <h1>Zendesk Subscriptions</h1>
        </div>
      </div>
    );
  }
}

export default App;
