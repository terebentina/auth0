import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import configureStore from './store/configureStore';
import App from './App';
import HomeConnector from './pages/HomeConnector';
import TicketsConnector from './pages/TicketsConnector';

const store = configureStore();

ReactDOM.render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={HomeConnector} />
        <Route path="/tickets" component={TicketsConnector} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('root'));
