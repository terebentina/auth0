import React, { PureComponent, PropTypes } from 'react';
import classNames from 'classnames';
import { domainRE } from '../utils/validator';

class DomainForm extends PureComponent {
  static propTypes = {
    domain: PropTypes.string,
    fetchTickets: PropTypes.func.isRequired,
  };

  state = {
    domain: this.props.domain || '',
    hasError: false,
  };

  onDomainChange = (e) => {
    this.setState({ domain: e.target.value });
  };

  onFormSubmit = (e) => {
    e.preventDefault();
    const domain = this.state.domain.trim();
    if (domainRE.test(domain)) {
      this.props.fetchTickets(domain);
    } else {
      this.setState({ hasError: true });
    }
  };

  render() {
    return (
      <div className="row">
        <form className="form-horizontal col-xs-12" onSubmit={this.onFormSubmit}>
          <div className="form-group">
            <label className="col-xs-1 control-label" htmlFor="domain">Domain:</label>
            <div className="col-xs-5">
              <input
                type="text"
                placeholder="Enter a ticket requester domain name."
                id="domain"
                autoFocus
                value={this.state.domain}
                className={classNames(
                  'form-control',
                  { 'has-error': this.state.hasError }
                )}
                onChange={this.onDomainChange}
              />
            </div>
            <div className="col-xs-6">
              <button type="submit" className="btn btn-primary btn-md">Search</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default DomainForm;
