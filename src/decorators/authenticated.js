import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    isLoggedIn: state.isLoggedIn,
  };
}

function authenticated(WrappedComponent) {
  /**
   * @return {null}
   */
  function Authenticated(props) {
    const { isLoggedIn, ...otherProps } = props;
    if (isLoggedIn) {
      return <WrappedComponent {...otherProps} />;
    }

    return null;
  }

  Authenticated.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
  };

  return connect(mapStateToProps)(Authenticated);
}

export default authenticated;
