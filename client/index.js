var React = require('react');

// var Actions = require('./actions'); // UNCOMMENT ME
var App = require('./components/app'); //Components
// var reducer = require('./reducers'); //Reducers // UNCOMMENT ME
var ReactDOM = require('react-dom')

// var store = require('redux').createStore(reducer); // UNCOMMENT ME

function render() {
    ReactDOM.render( <App/> , document.getElementById('root'));
}
render()

// store.subscribe(render); // UNCOMMENT ME
