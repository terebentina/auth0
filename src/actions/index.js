import Auth0Lock from 'auth0-lock';
import request from '../utils/request';
import { isTokenExpired } from '../utils/jwtHelper';
import * as Constants from '../constants';

const lock = new Auth0Lock(process.env.AUTH0_CLIENT_ID, process.env.AUTH0_DOMAIN, {
  autoclose: true,
  rememberLastLogin: false,
  auth: {
    redirect: false,
  },
});

const webtaskUrl = 'https://webtask.it.auth0.com/api/run/wt-dancaragea-gmail_com-1/webtask';
const auth0UserUrl = 'https://terebentina.eu.auth0.com/api/v2/users';

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

/**
 * Save this domain to user's metadata on Auth0
 */
function saveSearch(domain, tickets) {
  return (dispatch, getState) => {
    const state = getState();
    const idToken = localStorage.getItem('idToken');
    return request.patch(
      `${auth0UserUrl}/${state.profile.user_id}`,
      { user_metadata: { lastSearchedDomain: domain, ticketCount: tickets.length } },
      { headers: { Authorization: `Bearer ${idToken}` } }
    ).then((profile) => {
      dispatch(loginSuccess(profile, idToken));
    });
  };
}

export function fetchTickets(domain) {
  return (dispatch) => {
    dispatch(requestTickets());
    return request.get(webtaskUrl, { domain }, { headers: { Authorization: `Bearer ${localStorage.getItem('idToken')}` } })
      .then((json) => Promise.all([
        dispatch(saveSearch(domain, json)),
        dispatch(receiveTickets(domain, json)),
      ]))
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

function canAutoLogin() {
  const token = localStorage.getItem('idToken');
  const profile = localStorage.getItem('profile');
  return token && !isTokenExpired(token) && profile;
}

export function autoLoginIfPossible() {
  return (dispatch) => {
    if (canAutoLogin()) {
      const token = localStorage.getItem('idToken');
      const profile = JSON.parse(localStorage.getItem('profile'));
      return dispatch(loginSuccess(profile, token));
    }
  };
}
