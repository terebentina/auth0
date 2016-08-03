import React, { PropTypes } from 'react';
import classNames from 'classnames';
import HeaderConnector from './components/HeaderConnector';
import styles from './App.css';

function App({ children }) {
  return (
    <div>
      <HeaderConnector />
      <div className={classNames('container', styles.container)}>
        { children }
      </div>
    </div>
  );
}

App.propTypes = {
  children: PropTypes.any,
};

export default App;
