import React, { PropTypes } from 'react';
import PageConnector from './PageConnector';
import DomainForm from '../components/DomainForm';
import TicketList from '../components/TicketList';
import DirectSearchLink from '../components/DirectSearchLink';
import styles from './Tickets.css';

function Tickets({ tickets = [], domain = '', lastSearchedDomains = [], fetchTickets }) {
  return (
    <PageConnector title="Tickets">
      <div className="row">
        <div className="col-xs-10">
          <p>Enter a domain name below to search for tickets submitted by users of that domain.</p>
          <DomainForm domain={domain} fetchTickets={fetchTickets} />
          <TicketList tickets={tickets} domain={domain} />
        </div>
        <div className="col-xs-2">
          <div className={styles.list}>
            <h4>Recent searches</h4>
            {lastSearchedDomains.map((domain_, i) => <DirectSearchLink key={i} domain={domain_} fetchTickets={fetchTickets} />)}
          </div>
        </div>
      </div>
    </PageConnector>
  );
}

Tickets.propTypes = {
  tickets: PropTypes.array,
  domain: PropTypes.string,
  lastSearchedDomains: PropTypes.array,
  fetchTickets: PropTypes.func.isRequired,
};

export default Tickets;
