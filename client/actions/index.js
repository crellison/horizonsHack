/*
 * action types
 */

// These are just placeholders; replace with your code.

const ADD_HEALTH = 'ADD_HEALTH';


function addHealth(ages, days) {
  return {
  	type: ADD_HEALTH,
    ages: ages,
    days: days
  };
}

module.exports = {
  ADD_HEALTH: ADD_HEALTH,
  addHealth: addHealth
};
