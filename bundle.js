(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Point = function () {
    function Point(source) {
        this.lat = source.lat;
        if ('lng' in source) {
            this.lon = source.lng;
        }
        if ('lon' in source) {
            this.lon = source.lon;
        }
        if ('title' in source) {
            this.title = source.title;
        }
    }
    /**
     * The order for GMaps
     * @returns {[number,number]}
     */
    Point.prototype.getLocation = function () {
        return [this.lat, this.lon];
    };
    Point.prototype.midwayTo = function (p2) {
        var lat = (this.lat + p2.lat) / 2;
        var lon = (this.lon + p2.lon) / 2;
        return new Point({ lat: lat, lon: lon });
    };
    return Point;
}();
exports.Point = Point;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Point_1 = require("./Point");
// import {Promise} from 'promise-es6';
var Trip2017 = function () {
    function Trip2017() {
        this.source = 'trip2017.json';
        this.points = [];
        // this.initMap();
        // trip.drawRoute();
        // trip.travelRoute();
        // trip.getRoutes();
        this.loadPoints().then(this.initMap.bind(this)).then(this.showPlaces.bind(this)).then(this.fetchDistances.bind(this)).catch(function (e) {
            console.error(e);
        });
    }
    Trip2017.prototype.initMap = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.map = new GMaps({
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
                click: function click(e) {
                    _this.map.addMarker({
                        lat: e.latLng.lat(),
                        lng: e.latLng.lng(),
                        title: e.latLng.lat() + ',' + e.latLng.lng(),
                        click: function click(e) {
                            console.log(e);
                        }
                    });
                }
            });
            resolve();
        });
    };
    Trip2017.prototype.showPlaces = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.points.forEach(function (p) {
                _this.map.addMarker({
                    lat: p.lat,
                    lng: p.lon,
                    title: p.title,
                    click: function click(e) {
                        console.log(e);
                    },
                    point: p
                });
            });
            _this.map.fitZoom();
            resolve();
        });
    };
    Trip2017.prototype.drawRoute = function () {
        this.map.drawRoute({
            origin: [-12.044012922866312, -77.02470665341184],
            destination: [-12.090814532191756, -77.02271108990476],
            travelMode: 'driving',
            strokeColor: '#131540',
            strokeOpacity: 0.6,
            strokeWeight: 6
        });
    };
    Trip2017.prototype.travelRoute = function () {
        var _this = this;
        this.map.travelRoute({
            origin: [-12.044012922866312, -77.02470665341184],
            destination: [-12.090814532191756, -77.02271108990476],
            travelMode: 'driving',
            step: function step(e) {
                console.log(e);
                _this.map.drawPolyline({
                    path: e.path,
                    strokeColor: '#131540',
                    strokeOpacity: 0.6,
                    strokeWeight: 6
                });
            }
        });
    };
    Trip2017.prototype.getRoutes = function () {
        var _this = this;
        var origin = [-12.044012922866312, -77.02470665341184];
        var destination = [-12.090814532191756, -77.02271108990476];
        this.map.getRoutes({
            origin: origin,
            destination: destination,
            travelMode: 'driving',
            callback: function callback(e) {
                _this.routeRetrieved(e);
            }
        });
    };
    Trip2017.prototype.loadPoints = function () {
        var _this = this;
        return fetch(this.source).then(function (r) {
            return r.json();
        }).then(function (points) {
            points.forEach(function (p) {
                _this.points.push(new Point_1.Point(p));
            });
        }).then(function () {
            console.log(_this.points);
        }).catch(function (e) {
            console.error(e);
        });
    };
    Trip2017.prototype.fetchDistances = function () {
        var _this = this;
        //return new Promise((resolve, reject) => {
        var chain = Promise.resolve();
        var source = this.points[0];
        for (var i = 1; i < this.points.length; i++) {
            var destination = this.points[i];
            console.log(source.title, '=>', destination.title);
            (function (source, destination) {
                chain = chain.then(function () {
                    _this.fetchRoute(source, destination);
                });
            })(source, destination);
            // next step
            source = destination;
        }
        return chain;
        // });
    };
    Trip2017.prototype.fetchRoute = function (source, destination) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            console.log(source.title, '->', destination.title);
            //console.log(source.getLocation(), destination.getLocation());
            _this.map.getRoutes({
                origin: source.getLocation(),
                destination: destination.getLocation(),
                travelMode: 'driving',
                optimizeWaypoints: true,
                // callback: this.routeRetrieved.bind(this),
                error: function error(e) {
                    console.error(e);
                    reject(e);
                },
                callback: function callback(e) {
                    _this.routeRetrieved(e);
                    resolve(e);
                }
            });
        });
    };
    Trip2017.prototype.routeRetrieved = function (e) {
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
    };
    Trip2017.prototype.renderRoute = function (route) {
        var distance = 0;
        var time = 0;
        for (var i = 0; i < route.steps.length; i++) {
            route.forward();
            distance += route.steps[i].distance.value;
            time += route.steps[i].duration.value;
        }
        var km = (distance / 1000).toFixed(2);
        var hours = (time / 60 / 60).toFixed(2);
        var midIndex = this.getStepAtDistance(route.steps, distance / 2);
        var middle = route.steps[midIndex];
        //console.log(mid, middle);
        var start = new Point_1.Point({
            lat: middle.start_point.lat(),
            lon: middle.start_point.lng()
        });
        var midWay = start.midwayTo(new Point_1.Point({
            lat: middle.end_point.lat(),
            lon: middle.end_point.lng()
        }));
        this.map.drawOverlay({
            lat: midWay.lat,
            lng: midWay.lon,
            content: "<div class=\"routeLength\">\n\t\t\t\t" + km + " km, " + hours + " h</div>"
        });
    };
    Trip2017.prototype.getStepAtDistance = function (steps, midDistance) {
        var distance = 0;
        for (var i = 0; i < steps.length; i++) {
            distance += steps[i].distance.value;
            if (distance > midDistance) {
                return i;
            }
        }
        var midIndex = Math.floor(steps.length / 2);
        return midIndex;
    };
    return Trip2017;
}();
exports.Trip2017 = Trip2017;

},{"./Point":1}],3:[function(require,module,exports){
'use strict';

var _Trip = require('./Trip2017');

$(document).ready(function () {
	var trip = new _Trip.Trip2017();
	window['trip'] = trip;
});

},{"./Trip2017":2}]},{},[3]);
