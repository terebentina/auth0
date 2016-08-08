import React, { PureComponent, PropTypes } from 'react';
import classNames from 'classnames';
import styles from './Header.css';

class Header extends PureComponent {
  static propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    actions: PropTypes.object.isRequired,
  };

  onLoginClick = (e) => {
    e.preventDefault();
    this.props.actions.login();
  };

  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.actions.logout();
  };

  render() {
    const { isLoggedIn } = this.props;

    return (
      <header className={classNames(styles.header, 'site-header', 'clearfix')}>
        <nav role="navigation" className="navbar navbar-default">
          <div className="container">
            <div className="navbar-header">
              <button type="button" data-toggle="collapse" data-target="#navbar-collapse" className="navbar-toggle">
                <span className="sr-only">Toggle navigation</span><span className="icon-bar" /><span className="icon-bar" /><span className="icon-bar" />
              </button>
              <h1 className="navbar-brand"><a href="/"><span>Auth0</span></a></h1>
              <a href="https://auth0.com/jobs" className="no-basic hiring animated bounce hidden-sm hidden-xs hidden-md">We're hiring!</a></div>
            <div id="navbar-collapse" className="collapse navbar-collapse">
              <ul className="nav navbar-nav navbar-left no-basic">
                <li className="li-why"><a href="https://auth0.com/why-auth0">Why Dan+Auth0</a></li>
                <li className="li-how"><a href="https://auth0.com/how-it-works">How It Works</a>
                </li>
                <li className="li-pricing"><a href="https://auth0.com/pricing">Pricing</a></li>
                <li className="dropdown"><span role="button" data-toggle="dropdown" className="btn-dro">More<i className="icon-budicon-460" /></span>
                  <ul role="menu" aria-labelledby="dLabel" className="dropdown-menu">
                    <li><a href="https://auth0.com/lock">Lock</a></li>
                    <li><a href="https://auth0.com/passwordless">Passwordless</a></li>
                    <li><a href="https://auth0.com/wordpress">WordPress</a></li>
                    <li className="divider" />
                    <li><a href="https://auth0.com/about">About</a></li>
                    <li><a href="https://auth0.com/blog">Blog</a></li>
                    <li><a href="https://auth0.com/customers">Customers</a></li>
                    <li><a href="https://auth0.com/partners">Partners</a></li>
                    <li><a href="https://auth0.com/opensource">Open Source</a></li>
                    <li><a href="https://auth0.com/jobs">Jobs</a></li>
                  </ul>
                </li>
              </ul>
              <ul className="nav navbar-nav navbar-right">
                <li className="li-docs no-basic"><a href="https://auth0.com/support">Help &amp; Support</a></li>
                <li className="li-docs no-basic"><a href="https://auth0.com/docs">Documentation</a>
                </li>
                <li>
                  {
                    isLoggedIn ?
                      <a href="" onClick={this.onLogoutClick} className="signin-button login">Logout</a> :
                      <a href="" onClick={this.onLoginClick} className="signin-button login">Login</a>
                  }
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

export default Header;
