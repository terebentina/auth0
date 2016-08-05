import React from 'react';
import { connect } from 'react-redux';
import Home from './Home';

function HomeConnector(props) {
  return <Home {...props} />;
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.isLoggedIn,
  };
}

export default connect(mapStateToProps)(HomeConnector);
