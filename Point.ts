export class Point {

	lat: number;

	lon: number;

	title: string;

	constructor(source) {
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
	public getLocation() {
		return [this.lat, this.lon];
	}

	public midwayTo(p2: Point) {
		let lat = (this.lat + p2.lat) / 2;
		let lon = (this.lon + p2.lon) / 2;
		return new Point({lat, lon});
	}

}
