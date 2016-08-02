import { EventEmitter } from 'events';
import { isTokenExpired } from './jwtHelper';
import Auth0Lock from 'auth0-lock';

class AuthService extends EventEmitter {
  constructor(clientId, domain) {
    super();
    // Configure Auth0
    this.lock = new Auth0Lock(clientId, domain);
    // Add callback for lock `authenticated` event
    this.lock.on('authenticated', this._doAuthentication);
    // Add callback for lock `authorization_error` event
    this.lock.on('authorization_error', this._authorizationError);
  }

  _doAuthentication = (authResult) => {
    // Saves the user token
    this.setToken(authResult.idToken);
    // Async loads the user profile data
    this.lock.getProfile(authResult.idToken, (error, profile) => {
      if (error) {
        console.log('Error loading the Profile', error);
      } else {
        this.setProfile(profile);
      }
    });
  };

  _authorizationError = (error) => {
    // Unexpected authentication error
    console.log('Authentication Error', error);
  };

  login = () => {
    // Call the show method to display the widget.
    this.lock.show();
  };

  isLoggedIn = () => {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken();
    console.log('token', token);
    return !!token && !isTokenExpired(token);
  };

  setProfile = (profile) => {
    // Saves profile data to localStorage
    localStorage.setItem('profile', JSON.stringify(profile));
    // Triggers profile_updated event to update the UI
    this.emit('profile_updated', profile);
  };

  getProfile = () => {
    // Retrieves the profile data from localStorage
    const profile = localStorage.getItem('profile');
    return profile ? JSON.parse(localStorage.profile) : {};
  };

  setToken = (idToken) => {
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken);
  };

  // Retrieves the user token from localStorage
  getToken = () => localStorage.getItem('id_token');

  logout = () => {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
  };
}

// eslint-disable-next-line no-undef
const authService = new AuthService(AUTH0_CLIENT_ID, AUTH0_DOMAIN);
export default authService;
