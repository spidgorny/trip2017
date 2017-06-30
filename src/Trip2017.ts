import {Point} from './Point';
import {Route} from "./Route";
// import {Promise} from 'promise-es6';
// import {GMaps} from './declare.GMaps';
const GMaps: any = require('gmaps');

export class Trip2017 {

	map;

	routes: Route[] = [];

	source = 'assets/trip2017.json';

	points: Point[] = [];

	constructor() {
		// this.initMap();
		// trip.drawRoute();
		// trip.travelRoute();
		// trip.getRoutes();
		this.loadPoints()
			.then(this.initMap.bind(this))
			.then(this.showPlaces.bind(this))
			.then(this.fetchDistances.bind(this))
			.catch(e => {
				console.error(e);
			});
	}

	initMap() {
		return new Promise((resolve, reject) => {
			this.map = new GMaps({
				el: '#map',
				// lat: -12.043333,
				// lng: -77.028333,
				// zoom: 12,
				zoomControl: true,
				zoomControlOpt: {
					style: 'SMALL',
					position: 'TOP_LEFT'
				},
				panControl: false,
				streetViewControl: false,
				// mapTypeControl: false,
				// overviewMapControl: false,
				click: (e) => {
					this.map.addMarker({
						lat: e.latLng.lat(),
						lng: e.latLng.lng(),
						title: e.latLng.lat()+','+e.latLng.lng(),
						click: e => {
							console.log(e);
						},
					});
				}
			});
			resolve();
		});
	}

	showPlaces() {
		return new Promise((resolve, reject) => {
			this.points.forEach(p => {
				this.map.addMarker({
					lat: p.lat,
					lng: p.lon,
					title: p.title,
					click: e => {
						console.log(e);
					},
					point: p,
				});
			});
			this.map.fitZoom();
			resolve();
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
				const r = new Route(new Point(origin), new Point(destination));
				r.setMap(this.map);
				r.routeRetrieved(e);
			}
		});
	}

	loadPoints() {
		return fetch(this.source)
			.then(r => r.json())
			.then(points => {
				points.forEach(p => {
					this.points.push(new Point(p));
				});
			})
			.then(() => {
				console.log(this.points);
			})
			.catch(e => {
				console.error(e);
			});
	}

	fetchDistances() {
		//return new Promise((resolve, reject) => {
			let chain = Promise.resolve();
			let source = this.points[0];
			for (let i = 1; i < this.points.length; i++) {
				let destination = this.points[i];

				//console.log(source.title, '=>', destination.title);
				((source, destination) => {
					chain = chain.then(() => {
						this.fetchRoute(source, destination);
					});
				})(source, destination);

				// next step
				source = destination;
			}
			return chain;
		// });
	}

	fetchRoute(source: Point, destination: Point) {
		//console.log(source.title, '->', destination.title);
		//console.log(source.getLocation(), destination.getLocation());
		let route = new Route(source, destination);
		route.setMap(this.map);
		this.routes.push(route);
		return route.fetch();
	}

}
