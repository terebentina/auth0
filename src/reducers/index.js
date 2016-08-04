import { combineReducers } from 'redux';
import * as Constants from '../constants';

/**
 * state = {
 *   isFetching: true|false,
 *   isLoggedIn: true|false,
 *   profile: {...},
 *   message: { type: 'foo', text: 'bar' }
 * }
 */

function isFetching(state = false, action) {
  switch (action.type) {
    case Constants.REQUEST_SUBS:
      return true;
    case Constants.RECEIVE_SUBS:
      return false;
    default:
      return state;
  }
}

function isLoggedIn(state = false, action) {
  switch (action.type) {
    case Constants.LOGIN_SUCCESS:
      return true;
    case Constants.LOGOUT:
      return false;
    default:
      return state;
  }
}

function profile(state = {}, action) {
  switch (action.type) {
    case Constants.LOGIN_SUCCESS:
      localStorage.setItem('idToken', action.token);
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
});

export default rootReducer;
