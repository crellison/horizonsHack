var Actions = require('../actions');

// This is just a placeholder; replace with your code.
// const DEFAULT_STATE = "Redux Calendar";
const DEFAULT_STATE = {
    "Days" : [],
    "Age" : [];
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
            update[action.days] = state[action.days].concat({
                age: age
            });
            update[action.age] = state[action.age].concat({
                age: age  
            });
            update[//Why are we concat again? Pure functions question ... Why is this important?  
            return Object.assign({}, state, update);
        default:
            return DEFAULT_STATE;
    }
}.bind(this);

module.exports = reducer;
