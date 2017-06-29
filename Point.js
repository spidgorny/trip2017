"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Point = (function () {
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
}());
exports.Point = Point;
