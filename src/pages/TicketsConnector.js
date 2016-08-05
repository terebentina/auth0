import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchTicketsIfNeeded, fetchTickets } from '../actions';
import authenticated from '../hoc/authenticated';
import Tickets from './Tickets';

class TicketsConnector extends Component {
  static propTypes = {
    fetchTicketsIfNeeded: PropTypes.func,
    fetchTickets: PropTypes.func,
  };

  componentWillMount() {
    this.props.fetchTicketsIfNeeded();
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const { fetchTicketsIfNeeded: junk, ...otherProps } = this.props;
    return <Tickets {...otherProps} />;
  }
}

function mapStateToProps(state) {
  return {
    tickets: state.tickets,
    domain: state.domain,
  };
}

function mapActionsToProps(dispatch) {
  return bindActionCreators({ fetchTicketsIfNeeded, fetchTickets }, dispatch);
}

export default connect(mapStateToProps, mapActionsToProps)(authenticated(TicketsConnector));
