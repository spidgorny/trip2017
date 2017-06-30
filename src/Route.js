"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Point_1 = require("./Point");
// import {GMaps} from './declare.GMaps';
const GMaps = require('gmaps');
class Route {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }
    setMap(map) {
        this.map = map;
    }
    fetch() {
        return new Promise((resolve, reject) => {
            this.map.getRoutes({
                origin: this.start.getLocation(),
                destination: this.end.getLocation(),
                travelMode: 'driving',
                optimizeWaypoints: true,
                // callback: this.routeRetrieved.bind(this),
                error: (e) => {
                    console.error('Route.fetch()', e);
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
        console.log(this.start.title, '->', this.end.title);
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
        let start = new Point_1.Point({
            lat: middle.start_point.lat(),
            lon: middle.start_point.lng(),
        });
        let midWay = start.midwayTo(new Point_1.Point({
            lat: middle.end_point.lat(),
            lon: middle.end_point.lng(),
        }));
        this.map.drawOverlay({
            lat: midWay.lat,
            lng: midWay.lon,
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
exports.Route = Route;
