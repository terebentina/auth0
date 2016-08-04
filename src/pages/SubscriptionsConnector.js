import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchSubsIfNeeded } from '../actions';
import authenticated from '../hoc/authenticated';
import Subscriptions from './Subscriptions';

class SubscriptionsConnector extends Component {
  static propTypes = {
    actions: PropTypes.object,
  };

  componentWillMount() {
    this.props.actions.fetchSubsIfNeeded();
  }

  render() {
    return <Subscriptions {...this.props} />;
  }
}

function mapStateToProps(state) {
  return {
    subs: state.subs,
  };
}

function mapActionsToProps(dispatch) {
  return {
    actions: bindActionCreators({ fetchSubsIfNeeded }, dispatch),
  };
}

export default connect(mapStateToProps, mapActionsToProps)(authenticated(SubscriptionsConnector));
