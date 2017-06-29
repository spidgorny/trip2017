"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Trip2017 = (function () {
    function Trip2017() {
        var _this = this;
        this.map = new GMaps({
            el: '#map',
            lat: -12.043333,
            lng: -77.028333,
            zoom: 12,
            zoomControl: true,
            zoomControlOpt: {
                style: 'SMALL',
                position: 'TOP_LEFT'
            },
            panControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            overviewMapControl: false,
            click: function (e) {
                _this.map.addMarker({
                    lat: e.latLng.lat(),
                    lng: e.latLng.lng()
                });
            }
        });
    }
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
            step: function (e) {
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
            callback: function (e) {
                _this.route = new GMaps.Route({
                    map: _this.map,
                    route: e[0],
                    strokeColor: '#336699',
                    strokeOpacity: 0.5,
                    strokeWeight: 10
                });
                console.log(_this.route);
                _this.renderRoute(_this.route);
            }
        });
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
        var mid = Math.floor(route.steps_length / 2);
        var middle = route.steps[mid];
        console.log(mid, middle);
        var start = middle.start_location;
        this.map.drawOverlay({
            lat: start.lat(),
            lng: start.lng(),
            content: "<div class=\"routeLength\">\n\t\t\t\t" + km + "km " + hours + "h</div>"
        });
    };
    return Trip2017;
}());
exports.Trip2017 = Trip2017;
