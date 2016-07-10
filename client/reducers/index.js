var Actions = require('../actions');

// This is just a placeholder; replace with your code.
// const DEFAULT_STATE = "Redux Calendar";
const DEFAULT_STATE = {
    "Days" : [],
    "Ages" : [],
    "Mode" : "main"
};

// ----------------------------------------------
// REDUCER FOR ADD HEALTH
// ----------------------------------------------

// Note: You may have more than one reducer! If you do, combine them into
// a single reducer using Redux.combineReducers. See
// http://redux.js.org/docs/api/combineReducers.html and
// http://redux.js.org/docs/basics/Reducers.html for more info.
const reducer = function(state, action) {
    console.log('state:', state)
    if (typeof state === "undefined")
        return DEFAULT_STATE;

    // This is just a placeholder, replace it with your code.
    // Returning a new store
    switch (action.type) {
        case Actions.ADD_HEALTH:

            //New update object  
            var update = {};
            console.log('action', action)
            console.log('innerState:', state)
            update["Ages"] = state["Ages"].concat({
                ages: action.ages
            }); 
            update["Days"] = state["Days"].concat({
                days: action.days
            }); 
            return Object.assign({}, state, update);
        default:
            return DEFAULT_STATE;
    }
}.bind(this);

// ----------------------------------------------
// LOGIN LOGOUT REDUCERS
// ----------------------------------------------

import { combineReducers } from 'redux'
import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS
} from './actions'

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
function auth(state = {
    isFetching: false,
    isAuthenticated: localStorage.getItem('id_token') ? true : false
  }, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        user: action.creds
      })
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        errorMessage: ''
      })
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message
      })
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false
      })
    default:
      return state
  }
}

// We combine the reducers here so that they
// can be left split apart above
const buttonApp = combineReducers({
  auth,
  reducer
})

export default buttonApp

// module.exports = reducer;
