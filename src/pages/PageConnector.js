import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hideMessage } from '../actions';
import Page from './Page';

function PageConnector({ actions, ...otherProps }) {
  return <Page {...otherProps} onMessageHide={actions.hideMessage} />;
}

PageConnector.propTypes = {
  actions: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    message: state.message,
  };
}

function mapActionsToProps(dispatch) {
  return {
    actions: bindActionCreators({ hideMessage }, dispatch),
  };
}

export default connect(mapStateToProps, mapActionsToProps)(PageConnector);
