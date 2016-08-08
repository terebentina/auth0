import React, { PropTypes } from 'react';
import Ticket from './Ticket';

function TicketList({ tickets, domain }) {
  if (domain) {
    return (
      <div className="row">
        <h3>List of tickets submitted by <code>*@{domain}</code>:</h3>
        {
          !!tickets.length &&
            <table className="table table-fixed">
              <thead>
                <tr>
                  <th>Message</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket, i) => <Ticket key={i} ticket={ticket} />)}
              </tbody>
            </table>
        }
        {
          !tickets.length &&
            <p>No tickets matching <code>{domain}</code>!</p>
        }
      </div>
    );
  }

  return null;
}

TicketList.propTypes = {
  tickets: PropTypes.array,
  domain: PropTypes.string,
};

export default TicketList;
