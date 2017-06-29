export class Point {

	lat: number;

	lon: number;

	title: string;

	constructor(source) {
		this.lat = source.lat;
		this.lon = source.lng;
		this.title = source.title;
	}

	/**
	 * The order for GMaps
	 * @returns {[number,number]}
	 */
	public getLocation() {
		return [this.lat, this.lon];
	}

}
