import { Point } from './Point';
// import {Promise} from 'promise-es6';
export class Trip2017 {
    constructor() {
        this.source = 'trip2017.json';
        this.points = [];
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
                        title: e.latLng.lat() + ',' + e.latLng.lng(),
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
                this.routeRetrieved(e);
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
            console.log(source.title, '=>', destination.title);
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
    fetchRoute(source, destination) {
        return new Promise((resolve, reject) => {
            console.log(source.title, '->', destination.title);
            //console.log(source.getLocation(), destination.getLocation());
            this.map.getRoutes({
                origin: source.getLocation(),
                destination: destination.getLocation(),
                travelMode: 'driving',
                optimizeWaypoints: true,
                // callback: this.routeRetrieved.bind(this),
                error: (e) => {
                    console.error(e);
                    reject(e);
                },
                callback: (e) => {
                    this.routeRetrieved(e);
                    resolve(e);
                }
            });
        });
    }
    routeRetrieved(e) {
        //console.log('routeRetrieved', e);
        this.route = new GMaps.Route({
            map: this.map,
            route: e[0],
            strokeColor: '#336699',
            strokeOpacity: 0.5,
            strokeWeight: 10
        });
        //console.log(this.route);
        this.renderRoute(this.route);
    }
    renderRoute(route) {
        let distance = 0;
        let time = 0;
        for (let i = 0; i < route.steps.length; i++) {
            route.forward();
            distance += route.steps[i].distance.value;
            time += route.steps[i].duration.value;
        }
        const km = (distance / 1000).toFixed(2);
        const hours = (time / 60 / 60).toFixed(2);
        let midIndex = this.getStepAtDistance(route.steps, distance / 2);
        let middle = route.steps[midIndex];
        //console.log(mid, middle);
        let start = middle.start_location;
        this.map.drawOverlay({
            lat: start.lat(),
            lng: start.lng(),
            content: `<div class="routeLength">
				${km} km, ${hours} h</div>`
        });
    }
    getStepAtDistance(steps, midDistance) {
        let distance = 0;
        for (let i = 0; i < steps.length; i++) {
            distance += steps[i].distance.value;
            if (distance > midDistance) {
                return i;
            }
        }
        let midIndex = Math.floor(steps.length / 2);
        return midIndex;
    }
}
