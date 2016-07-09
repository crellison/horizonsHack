/*
 * action types
 */

// These are just placeholders; replace with your code.

const ADD_ACTIVITY = 'ADD_ACTIVITY';


function addActivity(id, name, heartRate, elapsedTime, calories, location) {
  return {
    type: ADD_ACTIVITY,
    id: id,
    name: name,
    heartRate: heartRate,
    elapsedTime: elapsedTime,
    calories: calories,
    location: location
  };
}

module.exports = {
  ADD_ACTIVITY: ADD_ACTIVITY,
  addText: addText,
  addActivity: addActivity
};
