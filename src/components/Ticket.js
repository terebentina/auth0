import React, { PureComponent, PropTypes } from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import formatDate from '../utils/formatDate';
import styles from './Ticket.css';

class Ticket extends PureComponent {
  static propTypes = {
    ticket: PropTypes.object,
  };

  state = { isDescriptionOpen: false };

  onSubjectClick = () => {
    this.setState({ isDescriptionOpen: !this.state.isDescriptionOpen });
  };

  render() {
    const { ticket } = this.props;
    const from = _.get(ticket, 'via.source.from', {});
    const to = _.get(ticket, 'via.source.to', {});

    return (
      <tr className={classNames(styles.ticketRow, this.state.isDescriptionOpen && styles.open)}>
        <td><a href={`mailto:${from.address}`}>{from.name}</a></td>
        <td>{to.name}</td>
        <td>
          <p className={styles.subject} onClick={this.onSubjectClick}>{ticket.subject}</p>
          <div className={styles.description}>
            {ticket.description}
          </div>
        </td>
        <td>{ticket.status}</td>
        <td>{formatDate(ticket.updated_at, 'MMM DD, YYYY HH:mm')}</td>
      </tr>
    );
  }
}

export default Ticket;
