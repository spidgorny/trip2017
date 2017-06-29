export class Trip2017 {

	map;

	route;

	constructor() {
		this.map = new GMaps({
			el: '#map',
			lat: -12.043333,
			lng: -77.028333,
			zoom: 12,
			zoomControl : true,
			zoomControlOpt: {
				style : 'SMALL',
				position: 'TOP_LEFT'
			},
			panControl : false,
			streetViewControl : false,
			mapTypeControl: false,
			overviewMapControl: false,
			click: (e) => {
				this.map.addMarker({
					lat: e.latLng.lat(),
					lng: e.latLng.lng()
				});
			}
		});
	}

	drawRoute() {
		this.map.drawRoute({
			origin: [-12.044012922866312, -77.02470665341184],
			destination: [-12.090814532191756, -77.02271108990476],
			travelMode: 'driving',
			strokeColor: '#131540',
			strokeOpacity: 0.6,
			strokeWeight: 6
		});
	}

	travelRoute() {
		this.map.travelRoute({
			origin: [-12.044012922866312, -77.02470665341184],
			destination: [-12.090814532191756, -77.02271108990476],
			travelMode: 'driving',
			step: (e) => {
				console.log(e);
				this.map.drawPolyline({
					path: e.path,
					strokeColor: '#131540',
					strokeOpacity: 0.6,
					strokeWeight: 6
				});
			}
		});
	}

	getRoutes() {
		let origin = [-12.044012922866312, -77.02470665341184];
		let destination = [-12.090814532191756, -77.02271108990476];

		this.map.getRoutes({
			origin,
			destination,
			travelMode: 'driving',
			callback: (e) => {
				this.route = new GMaps.Route({
					map: this.map,
					route: e[0],
					strokeColor: '#336699',
					strokeOpacity: 0.5,
					strokeWeight: 10
				});
				console.log(this.route);
				this.renderRoute(this.route);
			}
		});
	}

	renderRoute(route) {
		let distance = 0;
		let time = 0;
		for (let i = 0; i < route.steps.length; i++) {
			route.forward();
			distance += route.steps[i].distance.value;
			time += route.steps[i].duration.value;
		}
		const km = (distance/1000).toFixed(2);
		const hours = (time/60/60).toFixed(2);

		let mid = Math.floor(route.steps_length/2);
		let middle = route.steps[mid];
		console.log(mid, middle);
		let start = middle.start_location;

		this.map.drawOverlay({
			lat: start.lat(),
			lng: start.lng(),
			content: `<div class="routeLength">
				${km}km ${hours}h</div>`
		});
	}

}
