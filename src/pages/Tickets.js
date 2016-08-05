import React, { PropTypes } from 'react';
import PageConnector from './PageConnector';
import DomainForm from '../components/DomainForm';
import TicketList from '../components/TicketList';

function Tickets({ tickets = [], domain = '', fetchTickets }) {
  return (
    <PageConnector title="Tickets">
      <p>Enter a domain name below to search for tickets submitted by users of that domain.</p>
      <DomainForm domain={domain} fetchTickets={fetchTickets} />
      <TicketList tickets={tickets} domain={domain} />
    </PageConnector>
  );
}

Tickets.propTypes = {
  tickets: PropTypes.array,
  domain: PropTypes.string,
  fetchTickets: PropTypes.func.isRequired,
};

export default Tickets;
