import React, { PureComponent, PropTypes } from 'react';

class DirectSearchLink extends PureComponent {

  onClick = (e) => {
    const { domain, fetchTickets } = this.props;

    e.preventDefault();
    fetchTickets(domain);
  };

  render() {
    return <a href="" onClick={this.onClick}>{this.props.domain}</a>;
  }
}

DirectSearchLink.propTypes = {
  domain: PropTypes.string,
  fetchTickets: PropTypes.func.isRequired,
};

export default DirectSearchLink;
