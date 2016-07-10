// Entry point for button 

var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var addEvent = require('../actions').addEvent;
var Chart = require('chart.js')
var Data = require('../../grabData')

// jQuery AJAX support
var $ = require('jquery');

const App = React.createClass ({

  propTypes: {
      title: React.PropTypes.string,
      onClick: React.PropTypes.func
    },

  render: function() {
    // ------------------------------------------
    // LOGIN PAGE
    // ------------------------------------------
    return (
      <div className="row">
        <div className="col-xs-8 col-xs-offset-2 tallboy">
          <form className="form-signin">
            <h2 className="form-signin-heading">Please sign in</h2>
            <label name="inputEmail" className="sr-only">Email address</label>
            <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required=""/>
            <label name="inputPassword" className="sr-only">Password</label>
            <input type="password" id="inputPassword" className="form-control" placeholder="Password" required=""/>
            <div className="checkbox">
              <label>
                <input type="checkbox" value="remember-me"/> 
              </label>
            </div>
            <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
          </form>
        </div>
      </div>
    )

    //CONTROL PANEL RENDERING HERE - VIA MODE IN STATE
    var mainPanel = null;
    var mode = this.props.store.getState().mode;
    //Control panel views
    if (mode === 'main') {
      mainPanel =  <Profile store={this.props.store} activities={this.props.data}></Profile>
    } else if (mode === 'lifeline') {
      mainPanel = <Profile store={this.props.store} activities={this.props.data}><Healthline></Healthline></Profile>
    }
    return (
      <div className="row">
      	<div className="col-xs-9 tallboy" id="canvas">
        <Avatar>PLACE AVATAR HERE</Avatar>
      	</div>
        {mainPanel}
      </div>
    );
  }
})

const Avatar = React.createClass({
  render: function() { 
    return (
      <div className="avatar"></div>
    );
  }
})


const Profile = React.createClass({
  render: function() {
    return (
      <div className="col-xs-3 tallboy" id="nav" style={{'padding':0}}>
          <div id="profile">
            <div id="prof-mask">
              <img src="images/will.jpg" id="prof-pic"/>
            </div>
            <h3>Will Yoo</h3>
            <h5>willyoo+whatever@gmail.com</h5>
          </div>
          <HealthlineButton></HealthlineButton>
    </div> 
    )
  }
})


const HealthlineButton = React.createClass({  
  onClick: function() {
    console.log("State is: @app.js 125", this.state);
    console.log(this.props.store)


    var action = addHealth(Data.ages, Data.days)
    this.props.store.dispatch(action)

    //IN GET REQUEST, DISPATCH AGE AND ACTIVITY DATA
    //THIS HAS TO BE FIXED LOLOLOLOLOL

  },
  render: function() {
    return (
    <a href="javascript:void(0)" className="btn btn-raised" onClick={this.onClick}>Healthline</a>
    )
  }
})


const Healthline = React.createClass({
  getInitialState: function() {
    return {
      labels: [],
      data: []
    }
  },
  render: function() {
    var canvas = <canvas id="myChart" width="400" height="400"></canvas>
    var data = {
    //By Day
    //Need to set this with state
    labels: this.state.health.age,  //Must be an array (hopefully of ages)
    //Same?

    datasets: [
        {
            label: "Healthline",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            //Need to populate this with ages - state
            data: this.state.health.dayDelta,
        }
    ]
};
    var hLine = new Chart(canvas, {
    type: 'line',
    data: data,
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});
    return (
      <div>
      {hLine}
      </div>

    )
  }
})



module.exports = App;

