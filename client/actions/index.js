/*
 * action types
 */

// These are just placeholders; replace with your code.

const ADD_HEALTH = 'ADD_HEALTH';


function addHealth(fitness, fatigue, form, age) {
  return {
    fitness: fitness,
    fatigue: fatigue,
    form: form,
    age: age
  };
}

module.exports = {
  ADD_HEALTH: ADD_HEALTH,
  addHealth: addHealth
};
