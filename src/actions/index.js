import Auth0Lock from 'auth0-lock';
import request from '../utils/request';
import * as Constants from '../constants';

const lock = new Auth0Lock(process.env.AUTH0_CLIENT_ID, process.env.AUTH0_DOMAIN, {
  autoclose: true,
  rememberLastLogin: false,
  auth: {
    redirect: false,
  },
});

const webtaskUrl = 'https://webtask.it.auth0.com/api/run/wt-dancaragea-gmail_com-1/webtask';

export function showMessage(text, type = Constants.MESSAGE_SUCCESS) {
  return {
    type: Constants.SHOW_MESSAGE,
    message: { text, type },
  };
}

export function hideMessage() {
  return { type: Constants.HIDE_MESSAGE };
}

function loginSuccess(profile, token) {
  return {
    type: Constants.LOGIN_SUCCESS,
    profile,
    token,
  };
}

function loginError(error) {
  return {
    type: Constants.LOGIN_ERROR,
    error,
  };
}

export function login() {
  return (dispatch) => {
    lock.show();
    lock.once('authenticated', (authResult) => {
      lock.getProfile(authResult.idToken, (error, profile) => {
        if (error) {
          dispatch(loginError(error));
        }
        dispatch(loginSuccess(profile, authResult.idToken));
      });
    });
  };
}

export function logout() {
  return { type: Constants.LOGOUT };
}

function requestTickets() {
  return { type: Constants.REQUEST_TICKETS };
}

function receiveTickets(domain, tickets) {
  return {
    type: Constants.RECEIVE_TICKETS,
    domain,
    tickets,
  };
}

export function fetchTickets(domain) {
  return (dispatch) => {
    dispatch(requestTickets());
    return request.get(webtaskUrl, { domain }, { headers: { Authorization: `Bearer ${localStorage.getItem('idToken')}` } })
      .then((json) => dispatch(receiveTickets(domain, json)))
      .catch((err) => Promise.all([
        dispatch(receiveTickets(domain, [])),
        dispatch(showMessage(`Server responded: ${err.statusText || err}`, Constants.MESSAGE_ERROR)),
      ]));
  };
}

function shouldFetchTickets(state) {
  return !state.isFetching && state.domain;
}

export function fetchTicketsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchTickets(getState())) {
      return dispatch(fetchTickets());
    }
  };
}
