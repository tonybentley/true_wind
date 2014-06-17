var true_wind = ( function() {
	"use strict";
	var tw = {};
	tw.perRound = function(num, precision)  {
		 var _precision = typeof(precision) == "number" ? precision : 2, 
			result1 = num * Math.pow(10, _precision),
		 	result2 = Math.round(result1),
		 	result3 = result2 / Math.pow(10, _precision);
		return result3.toFixed(_precision);
	};
	tw.degRad = function(deg){
		var conv_factor = (2.0 * Math.PI)/360.0;
		return(deg * conv_factor);
	};
	tw.radDeg = function(rad){
		var conv_factor = 360/(2.0 * Math.PI);
		return(rad * conv_factor);
	};
	tw.calculate = function(obj){
		var apparent_wind_angle = parseFloat(obj.apparent_wind_angle);
		if (isNaN(apparent_wind_angle)){
			console.log("Please supply a valid value for Difference Between Heading and Apparent Wind Direction");
			return;
		}
		apparent_wind_angle = this.degRad(apparent_wind_angle);
		var apparent_wind_speed = parseFloat(obj.apparent_wind_speed);
		if (isNaN(apparent_wind_speed)){
			console.log("Please supply a valid value for Apparent Wind Speed");
			return;
		}
		var speed_over_water = parseFloat(obj.speed_over_water);
		if (isNaN(speed_over_water)){
			console.log("The Ship's Speed must be specified if the Apparent Wind Speed is specified in knots.");
			return;
		}
		var apparent_wind_speed = apparent_wind_speed / speed_over_water,
		 	tan_alpha = (Math.sin(apparent_wind_angle) / (apparent_wind_speed - Math.cos(apparent_wind_angle))),
		 	alpha = Math.atan(tan_alpha),
		 	true_wind_angle = this.radDeg(apparent_wind_angle + alpha),
		 	true_speed_over_water = Math.sin(apparent_wind_angle)/Math.sin(alpha);
		 	return{
				//speed_over_water: obj.speed_over_water,
				//apparent_wind_speed: obj.apparent_wind_speed,
				//apparent_wind_angle: obj.apparent_wind_angle,
				//precise_true_wind_angle: true_wind_angle,
				//not sure what this is.....
				//true_speed_over_water???: true_speed_over_water,
				//precise_true_wind_speed: (isNaN(speed_over_water) ? "Unknown" : (true_speed_over_water * speed_over_water)),
				true_wind_angle: this.perRound(true_wind_angle),
				//rounded_true_speed_over_water???: this.perRound(true_speed_over_water),
				true_wind_speed: (isNaN(speed_over_water) ? "Unknown" : this.perRound(true_speed_over_water * speed_over_water))
		};
	};
	return tw;
}());
module.exports = true_wind;
