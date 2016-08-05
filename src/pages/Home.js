import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import PageConnector from './PageConnector';

function Home({ isLoggedIn }) {
  return (
    <PageConnector title="Zendesk + Auth0 + Webtask Fun">
      <p>Welcome to this beautiful app!</p>
      {
        isLoggedIn &&
          <p>Now that you're logged in, you should head to <Link to="/tickets">tickets</Link> - that's where all the magic happens.</p>
      }
    </PageConnector>
  );
}

Home.propTypes = {
  isLoggedIn: PropTypes.bool,
}

export default Home;
