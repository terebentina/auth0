import React, { PureComponent, PropTypes } from 'react';

class TicketList extends PureComponent {
  static propTypes = {
    tickets: PropTypes.array,
    domain: PropTypes.string,
  };

  render() {
    const { tickets, domain } = this.props;

    if (domain) {
      return (
        <div className="row">
          <h3>List of tickets submitted by <code>*@{domain}</code>:</h3>
          {
            !!tickets.length &&
              <ul>
                {tickets.map((ticket, i) => <li key={i}>{`Subject: ${ticket.subject}`}</li>)}
              </ul>
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
}

export default TicketList;
