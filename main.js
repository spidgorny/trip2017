import {Trip2017} from './Trip2017';

$(document).ready(() => {
	let trip = new Trip2017();
	window['trip'] = trip;
	// trip.drawRoute();
	// trip.travelRoute();
	trip.getRoutes();
});

