// Entry point for button 

var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var addEvent = require('../actions').addEvent;

// jQuery AJAX support
var $ = require('jquery');

const App = React.createClass ({

  propTypes: {
      title: React.PropTypes.string,
      onClick: React.PropTypes.func
    },


  render: function() {
    return (
      <div className="row">
      	<div className="col-xs-9 tallboy" id="canvas">

      	</div>
      	<div className="col-xs-3 tallboy" id="nav" style={{'padding':0}}>
      		<div id="profile">
      			<div id="prof-mask">
	      			<img src="images/will.jpg" id="prof-pic"/>
      			</div>
      			<h3>Will Yoo</h3>
      			<h5>willyoo+whatever@gmail.com</h5>
      		</div>
      	</div> 
      	</div>
    );
  }
})

        module.exports = App;

