(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Point = exports.Point = function () {
    function Point(source) {
        _classCallCheck(this, Point);

        this.lat = source.lat;
        this.lon = source.lng;
        this.title = source.title;
    }
    /**
     * The order for GMaps
     * @returns {[number,number]}
     */


    _createClass(Point, [{
        key: "getLocation",
        value: function getLocation() {
            return [this.lat, this.lon];
        }
    }]);

    return Point;
}();

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Trip2017 = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Point = require('./Point');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import {Promise} from 'promise-es6';
var Trip2017 = exports.Trip2017 = function () {
    function Trip2017() {
        _classCallCheck(this, Trip2017);

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

    _createClass(Trip2017, [{
        key: 'initMap',
        value: function initMap() {
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
        }
    }, {
        key: 'showPlaces',
        value: function showPlaces() {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                _this2.points.forEach(function (p) {
                    _this2.map.addMarker({
                        lat: p.lat,
                        lng: p.lon,
                        title: p.title,
                        click: function click(e) {
                            console.log(e);
                        },
                        point: p
                    });
                });
                _this2.map.fitZoom();
                resolve();
            });
        }
    }, {
        key: 'drawRoute',
        value: function drawRoute() {
            this.map.drawRoute({
                origin: [-12.044012922866312, -77.02470665341184],
                destination: [-12.090814532191756, -77.02271108990476],
                travelMode: 'driving',
                strokeColor: '#131540',
                strokeOpacity: 0.6,
                strokeWeight: 6
            });
        }
    }, {
        key: 'travelRoute',
        value: function travelRoute() {
            var _this3 = this;

            this.map.travelRoute({
                origin: [-12.044012922866312, -77.02470665341184],
                destination: [-12.090814532191756, -77.02271108990476],
                travelMode: 'driving',
                step: function step(e) {
                    console.log(e);
                    _this3.map.drawPolyline({
                        path: e.path,
                        strokeColor: '#131540',
                        strokeOpacity: 0.6,
                        strokeWeight: 6
                    });
                }
            });
        }
    }, {
        key: 'getRoutes',
        value: function getRoutes() {
            var _this4 = this;

            var origin = [-12.044012922866312, -77.02470665341184];
            var destination = [-12.090814532191756, -77.02271108990476];
            this.map.getRoutes({
                origin: origin,
                destination: destination,
                travelMode: 'driving',
                callback: function callback(e) {
                    _this4.routeRetrieved(e);
                }
            });
        }
    }, {
        key: 'loadPoints',
        value: function loadPoints() {
            var _this5 = this;

            return fetch(this.source).then(function (r) {
                return r.json();
            }).then(function (points) {
                points.forEach(function (p) {
                    _this5.points.push(new _Point.Point(p));
                });
            }).then(function () {
                console.log(_this5.points);
            }).catch(function (e) {
                console.error(e);
            });
        }
    }, {
        key: 'fetchDistances',
        value: function fetchDistances() {
            var _this6 = this;

            //return new Promise((resolve, reject) => {
            var chain = Promise.resolve();
            var source = this.points[0];
            for (var i = 1; i < this.points.length; i++) {
                var destination = this.points[i];
                console.log(source.title, '=>', destination.title);
                (function (source, destination) {
                    chain = chain.then(function () {
                        _this6.fetchRoute(source, destination);
                    });
                })(source, destination);
                // next step
                source = destination;
            }
            return chain;
            // });
        }
    }, {
        key: 'fetchRoute',
        value: function fetchRoute(source, destination) {
            var _this7 = this;

            return new Promise(function (resolve, reject) {
                console.log(source.title, '->', destination.title);
                //console.log(source.getLocation(), destination.getLocation());
                _this7.map.getRoutes({
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
                        _this7.routeRetrieved(e);
                        resolve(e);
                    }
                });
            });
        }
    }, {
        key: 'routeRetrieved',
        value: function routeRetrieved(e) {
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
    }, {
        key: 'renderRoute',
        value: function renderRoute(route) {
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
            var start = middle.start_location;
            this.map.drawOverlay({
                lat: start.lat(),
                lng: start.lng(),
                content: '<div class="routeLength">\n\t\t\t\t' + km + ' km, ' + hours + ' h</div>'
            });
        }
    }, {
        key: 'getStepAtDistance',
        value: function getStepAtDistance(steps, midDistance) {
            var distance = 0;
            for (var i = 0; i < steps.length; i++) {
                distance += steps[i].distance.value;
                if (distance > midDistance) {
                    return i;
                }
            }
            var midIndex = Math.floor(steps.length / 2);
            return midIndex;
        }
    }]);

    return Trip2017;
}();

},{"./Point":1}],3:[function(require,module,exports){
'use strict';

var _Trip = require('./Trip2017');

$(document).ready(function () {
	var trip = new _Trip.Trip2017();
	window['trip'] = trip;
});

},{"./Trip2017":2}]},{},[3]);
