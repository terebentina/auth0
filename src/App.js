import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';
import { autoLoginIfPossible } from './actions';
import HeaderConnector from './components/HeaderConnector';
import styles from './App.css';

class App extends Component {

  componentWillMount() {
    this.props.autoLoginIfPossible();
  }

  render() {
    return (
      <div>
        <HeaderConnector />
        <div className={classNames('container', styles.container)}>
          { this.props.children }
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.any,
  autoLoginIfPossible: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ autoLoginIfPossible }, dispatch);
}

export default connect(null, mapDispatchToProps)(App);
