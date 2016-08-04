import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import configureStore from './store/configureStore';
import App from './App';
import Home from './pages/Home';
import SubscriptionsConnector from './pages/SubscriptionsConnector';

const store = configureStore();

ReactDOM.render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="/subscriptions" component={SubscriptionsConnector} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('root'));
