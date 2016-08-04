import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { login, logout } from '../actions';
import Header from './Header';

function HeaderConnector(props) {
  return <Header {...props} />;
}

function mapStateToProps(state) {
  return { isLoggedIn: state.isLoggedIn };
}

function mapActionsToProps(dispatch) {
  return {
    actions: bindActionCreators({ login, logout }, dispatch),
  };
}

export default connect(mapStateToProps, mapActionsToProps)(HeaderConnector);
