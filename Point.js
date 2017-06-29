export class Point {
    constructor(source) {
        this.lat = source.lat;
        this.lon = source.lng;
        this.title = source.title;
    }
    /**
     * The order for GMaps
     * @returns {[number,number]}
     */
    getLocation() {
        return [this.lat, this.lon];
    }
}
