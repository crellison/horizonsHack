import React, { Component } from 'react';

export default class App extends Component {
  render() {
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
}
