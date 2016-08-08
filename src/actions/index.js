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

function saveDomain(domain) {
  return {
    type: Constants.SET_DOMAIN,
    domain,
  };
}

function receiveTickets(tickets) {
  return {
    type: Constants.RECEIVE_TICKETS,
    tickets,
  };
}

/**
 * Save this domain to user's metadata on Auth0
 */
function saveSearch(domain) {
  return (dispatch, getState) => {
    const state = getState();
    const idToken = localStorage.getItem('idToken');
    let lastSearchedDomains = state.profile.user_metadata.lastSearchedDomains || [];
    lastSearchedDomains = lastSearchedDomains.filter((val) => val != domain);
    lastSearchedDomains.unshift(domain);
    lastSearchedDomains = lastSearchedDomains.slice(0, 4);

    return request.patch(
      `${auth0UserUrl}/${state.profile.user_id}`,
      { user_metadata: { lastSearchedDomains } },
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
        dispatch(saveSearch(domain)),
        dispatch(saveDomain(domain)),
        dispatch(receiveTickets(json)),
      ]))
      .catch((err) => Promise.all([
        dispatch(receiveTickets([])),
        dispatch(showMessage(`Server responded: ${err.statusText || err}`, Constants.MESSAGE_ERROR)),
      ]));
  };
}

function shouldFetchTickets(state) {
  return !state.isFetching && state.domain;
}

export function fetchTicketsIfNeeded() {
  return (dispatch, getState) => {
    const state = getState();
    if (shouldFetchTickets(state)) {
      return dispatch(fetchTickets(state.domain));
    }
  };
}

function canAutoLogin() {
  const token = localStorage.getItem('idToken');
  const profile = localStorage.getItem('profile');
  return token && !isTokenExpired(token) && profile;
}

function autoLoginIfPossible() {
  return (dispatch) => {
    if (canAutoLogin()) {
      const token = localStorage.getItem('idToken');
      const profile = JSON.parse(localStorage.getItem('profile'));
      return dispatch(loginSuccess(profile, token));
    }
  };
}

function populateDomainFromAuth0Metadata() {
  return (dispatch, getState) => {
    const state = getState();
    if (state.isLoggedIn && state.profile.user_metadata.lastSearchedDomains && state.profile.user_metadata.lastSearchedDomains.length) {
      dispatch(saveDomain(state.profile.user_metadata.lastSearchedDomains[0]));
    }
  };
}

export function prePopulateStore() {
  return (dispatch) => {
    dispatch(autoLoginIfPossible());
    dispatch(populateDomainFromAuth0Metadata());
  };
}
