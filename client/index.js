var React = require('react');

var Actions = require('./actions');
var App = require('./components/app'); //Components
var reducer = require('./reducers'); //Reducers
var ReactDOM = require('react-dom')

var store = require('redux').createStore(reducer); 

function render() {
ReactDOM.render(<App />, document.getElementById('root'));
}
render()

store.subscribe(render);
