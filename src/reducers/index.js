import { combineReducers } from 'redux';
import * as Constants from '../constants';

/**
 * state = {
 *   isLoggedIn: true|false,
 *   profile: {...},
 * }
 */

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

const rootReducer = combineReducers({
  isLoggedIn,
  profile,
});

export default rootReducer;
