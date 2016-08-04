import React from 'react';
import authenticated from '../decorators/authenticated';

function Subscriptions() {
  return (
    <div>
      <h1>Subscriptions</h1>
    </div>
  );
}

export default authenticated(Subscriptions);
