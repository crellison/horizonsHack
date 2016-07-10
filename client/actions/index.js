// ----------------------------------------------
// ACTION TYPES
// ----------------------------------------------
 
// ----------------------------------------------
// ADD HEALTH ACTION
// ----------------------------------------------

const ADD_HEALTH = 'ADD_HEALTH';

function addHealth(ages, days) {
  return {
  	type: ADD_HEALTH,
    ages: ages,
    days: days
  };
}

// ----------------------------------------------
// LOGIN ACTIONS
// ----------------------------------------------

// There are three possible states for our login
// process and we need actions for each of them
const LOGIN_REQUEST = 'LOGIN_REQUEST'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_FAILURE = 'LOGIN_FAILURE'

function requestLogin(creds) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  }
}

function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: user.id_token
  }
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

// Calls the API to get a token and
// dispatches actions along the way
function loginUser(creds) {

  let config = {
    method: 'POST',
    headers: { 'Content-Type':'application/x-www-form-urlencoded' },
    body: `email=${creds.email}&password=${creds.password}`
  }

  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds))

    return fetch('http://localhost:3000/api/authenticate', config)
      .then(response =>
        response.json().then(user => ({ user, response }))
            ).then(({ user, response }) =>  {
        if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(loginError(user.message))
          return Promise.reject(user)
        } else {
          // If login was successful, set the token in local storage
          localStorage.setItem('id_token', user.id_token)
          // Dispatch the success action
          dispatch(receiveLogin(user))
        }
      }).catch(err => console.log("Error: ", err))
  }
}

// ----------------------------------------------
// LOGOUT ACTIONS
// ----------------------------------------------

// Three possible states for our logout process as well.
// Since we are using JWTs, we just need to remove the token
// from localStorage. These actions are more useful if we
// were calling the API to log the user out
const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
const LOGOUT_FAILURE = 'LOGOUT_FAILURE'

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  }
}

function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  }
}

// Logs the user out
function logoutUser() {
  return dispatch => {
    dispatch(requestLogout())
    localStorage.removeItem('id_token')
    dispatch(receiveLogout())
  } 
}

module.exports = {
  ADD_HEALTH: ADD_HEALTH,
  addHealth: addHealth,
  LOGIN_REQUEST : LOGIN_REQUEST,
	LOGIN_SUCCESS : LOGIN_SUCCESS,
	LOGIN_FAILURE : LOGIN_FAILURE,
	loginUser : loginUser,
	LOGOUT_REQUEST : LOGOUT_REQUEST,
	LOGOUT_SUCCESS : LOGOUT_SUCCESS,
	LOGOUT_FAILURE : LOGOUT_FAILURE,
	logoutUser : logoutUser,
};
