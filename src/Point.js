"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Point {
    constructor(source) {
        // lat
        if ('lat' in source) {
            this.lat = source.lat;
        }
        if (0 in source) {
            this.lat = source[0];
        }
        // long
        if (1 in source) {
            this.lon = source[1];
        }
        if ('lng' in source) {
            this.lon = source.lng;
        }
        if ('lon' in source) {
            this.lon = source.lon;
        }
        // title
        if ('title' in source) {
            this.title = source.title;
        }
    }
    /**
     * The order for GMaps
     * @returns {[number,number]}
     */
    getLocation() {
        return [this.lat, this.lon];
    }
    midwayTo(p2) {
        let lat = (this.lat + p2.lat) / 2;
        let lon = (this.lon + p2.lon) / 2;
        return new Point({ lat, lon });
    }
}
exports.Point = Point;
