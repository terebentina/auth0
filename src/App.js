import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';
import { autoLoginIfPossible } from './actions';
import HeaderConnector from './components/HeaderConnector';
import LoadingIndicator from './components/LoadingIndicator';
import styles from './App.css';

class App extends Component {

  componentWillMount() {
    this.props.autoLoginIfPossible();
  }

  render() {
    return (
      <div className={styles.app}>
        <HeaderConnector />
        <div className={classNames('container', styles.container)}>
          { this.props.children }
        </div>
        <LoadingIndicator className={styles.loading} show={this.props.isFetching} />
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.any,
  isFetching: PropTypes.bool,
  autoLoginIfPossible: PropTypes.func,
};

function mapStateToProps(state) {
  return { isFetching: state.isFetching };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ autoLoginIfPossible }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
