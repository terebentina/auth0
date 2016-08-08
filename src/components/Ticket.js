import React, { PureComponent, PropTypes } from 'react';
import classNames from 'classnames';
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

    return (
      <tr className={classNames(styles.ticketRow, this.state.isDescriptionOpen && styles.open)}>
        <td>
          <p className={styles.subject} onClick={this.onSubjectClick}>{ticket.subject}</p>
          <div className={styles.description}>
            {ticket.description}
          </div>
        </td>
        <td>
          {ticket.status}
        </td>
      </tr>
    );
  }
}

export default Ticket;
