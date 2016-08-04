import React, { PropTypes } from 'react';
import PageConnector from './PageConnector';

function Subscriptions({ subs = [] }) {
  return (
    <PageConnector title="Subscriptions">
      <ul>
        {subs.map((sub, i) => <li key={i}>{sub.title}</li>)}
      </ul>
    </PageConnector>
  );
}

Subscriptions.propTypes = {
  subs: PropTypes.array,
};

export default Subscriptions;
