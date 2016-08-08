import { combineReducers } from 'redux';
import { isTokenExpired } from '../utils/jwtHelper';
import * as Constants from '../constants';

/**
 * state = {
 *   isFetching: true|false,
 *   isLoggedIn: true|false,
 *   profile: {...},
 *   message: { type: 'foo', text: 'bar' }
 *   tickets: [],
 *   domain: ''
 * }
 */

function isFetching(state = false, action) {
  switch (action.type) {
    case Constants.REQUEST_TICKETS:
      return true;
    case Constants.RECEIVE_TICKETS:
      return false;
    default:
      return state;
  }
}

/**
 * Boolean value for showing user login status
 */
function isLoggedIn(state = false, action) {
  const token = localStorage.getItem('idToken');
  if (action.type == Constants.LOGIN_SUCCESS) {
    return true;
  } else if (action.type == Constants.LOGOUT) {
    return false;
  } else if (token) {
    if (isTokenExpired(token)) {
      localStorage.removeItem('idToken');
      localStorage.removeItem('profile');
      return false;
    }
    return true;
  }

  return state;
}

/**
 * User profile. Saved in both localStorage for in-between browser restarts and redux for easy access
 */
function profile(state = {}, action) {
  switch (action.type) {
    case Constants.LOGIN_SUCCESS:
      localStorage.setItem('idToken', action.token);
      localStorage.setItem('profile', JSON.stringify(action.profile));
      return action.profile;

    case Constants.PROFILE_UPDATE:
      localStorage.setItem('profile', JSON.stringify(action.profile));
      return action.profile;

    case Constants.LOGIN_ERROR:
    case Constants.LOGOUT:
      localStorage.removeItem('idToken');
      localStorage.removeItem('profile');
      return {};

    default:
      return state;
  }
}

/**
 * The list of messages retrieved after a search
 */
function tickets(state = [], action) {
  switch (action.type) {
    case Constants.RECEIVE_TICKETS:
      return action.tickets;

    default:
      return state;
  }
}

/**
 * This holds the last searched domain. Useful for re-searches and for other ticket-related messages
 */
function domain(state = '', action) {
  switch (action.type) {
    case Constants.SET_DOMAIN:
      return action.domain;

    default:
      return state;
  }
}

/**
 * Global error or success messages that needs to be show to user as a result of some action
 */
function message(state = null, action) {
  if (action.type === Constants.SHOW_MESSAGE) {
    return action.message;
  } else if (action.type === Constants.HIDE_MESSAGE) {
    return null;
  }

  return state;
}

const rootReducer = combineReducers({
  isFetching,
  isLoggedIn,
  profile,
  message,
  tickets,
  domain,
});

export default rootReducer;
