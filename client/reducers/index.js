var Actions = require('../actions');

// This is just a placeholder; replace with your code.
// const DEFAULT_STATE = "Redux Calendar";
const DEFAULT_STATE = {
    "Days" : [],
    "Ages" : [],
    "Mode" : "main"
};

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

module.exports = reducer;
