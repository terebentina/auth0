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

function requestSubs() {
  return { type: Constants.REQUEST_SUBSCRIPTIONS };
}

function receiveSubs(subs) {
  return {
    type: Constants.RECEIVE_SUBSCRIPTIONS,
    subs,
  };
}

function fetchSubs() {
  return (dispatch) => {
    dispatch(requestSubs());
    return request.get('http://google.com')
      .then((json) => dispatch(receiveSubs(json)))
      .catch((err) => Promise.all([
        dispatch(receiveSubs([])),
        dispatch(showMessage(`Server responded: ${err.statusText}`, Constants.MESSAGE_ERROR)),
      ]));
  };
}

function shouldFetchSubs(state) {
  return !state.isFetching;
}

export function fetchSubsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchSubs(getState())) {
      return dispatch(fetchSubs());
    }
  };
}
