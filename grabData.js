var request = require('request');
var _ = require('underscore')
var tok = process.env.STRAVA_TOK

// personal HR data
var HR_MAX = 208
var HR_REST = 45
// correction factor for intensity
var B_M = 1.92
var B_F = 1.67
// weighing factors fitness/fatigue
var k1 = 1
var k2 = 2
// decay constants fitness/fatigue
var t1 = 42
var t2 = 7
// starting age
var AGE = 70


function grabData() {
	request('https://www.strava.com/api/v3/athlete/activities?access_token='+tok+'&per_page=200', 
		function(error, response, body) {
			if (error) console.log('bummer....')
			else {
				console.log('got it!!')
				var rides = {}
				var oneDay = 24*60*60*1000
				var count = 1
				_.each(JSON.parse(body), function(activity,index) {

					var dayDelta = Math.round(Math.abs((Date.parse(activity.start_date) - Date.now())/(oneDay)))
					var avgSpeed = Math.round(activity.average_speed*60*60/1000*100)/100

					if (activity.has_heartrate && (/^ride/i).test(activity.type)) {
						if (rides[dayDelta])
							rides[dayDelta]+=getTRIMP(activity.average_heartrate, Math.round(activity.moving_time/60/60*100)/100)
						else rides[dayDelta]=getTRIMP(activity.average_heartrate, Math.round(activity.moving_time/60/60*100)/100)
					}
				})
				var trimpScores = new Array(180)
				trimpScores = _.map(trimpScores,function(val, index) {
					return rides[index] ? rides[index] : 0})

				var data = _.map(trimpScores, function(val,index) {
					var temp = {}
					temp.fitness = k1*_.reduce(trimpScores.slice(index+1), function(memo,trimp,i) {
						return memo + trimp*Math.exp(-(i)/t1)
					},0)
					temp.fatigue = k2*_.reduce(trimpScores.slice(index+1), function(memo,trimp,i) {
						return memo + trimp*Math.exp(-(i)/t2)
					},0)
					temp.form = temp.fitness - temp.fatigue > 0 ? temp.fitness - temp.fatigue : 0
					temp.age = Math.round(AGE - temp.form/10)
					return temp
				})
				_.each(data, function(elt) {console.log(elt.age)})
			}
		}
	)
}

function getTRIMP(hr,dur) {
	return dur*(hr-HR_REST)/(HR_MAX-hr)*Math.exp(B_M*(hr-HR_REST)/(HR_MAX-hr))
}

grabData()