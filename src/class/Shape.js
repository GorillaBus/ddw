const Vector = require('./Vector');

class Shape {

	/**
	* Represents a single 2D shape composed by different points (a polygon) that can be transformed, projected, scaled and drawn.
	* @summary View file: {@link https://github.com/GorillaBus/ddw/blob/master/src/class/BodyManager.js https://github.com/GorillaBus/ddw/blob/master/src/class/Shape.js}.
	* @constructor
	* @param {Object} settings - Json object with construction options.
	* @param {Boolean} [settings.visible=true] - The shape's default visibility.
	* @param {String} settings.strokeColor - A hex color code.
	* @param {String} settings.fillColor - A hex color code.
	*/
	constructor(settings) {
		this.points = settings.points.map(p => {
			return new Vector({ x: p.x, y: p.y });
		});
		this.visible = settings.visible === false ? false:true;
		this.strokeColor = settings.strokeColor;
		this.fillColor = settings.fillColor;
		this.bounds = this.getBounds();
		this.center = this.getCenter();
		this.width = this.bounds.xMax - this.bounds.xMin;
		this.height = this.bounds.yMax - this.bounds.yMin;
		this.radius = Math.max(this.width, this.height) / 2;
	}

	/**
	* Finds the maximum and minimum magnitudes betwee the shape's points over each axis.
	* @method
	* @returns {Object} A json object definint the maximum and minimum values for the x and y axis.
	*/
	getBounds() {
		const xs = this.points.map(p => p.getX());
		const ys = this.points.map(p => p.getY());
		return {
			xMin: Math.min.apply(null, xs),
			xMax: Math.max.apply(null, xs),
			yMin: Math.min.apply(null, ys),
			yMax: Math.max.apply(null, ys)
		};
	}

	/**
	* Finds the center point of the shape computed from it's bounds.
	* @method
	* @returns {Object} A json object defining the x and y coordinates of the shape's center point.
	*/
	getCenter() {
		return new Vector({
			x: (this.bounds.xMin + this.bounds.xMax) / 2,
			y: (this.bounds.yMin + this.bounds.yMax) / 2
		});
	}

	/**
	* Creates a copy of the current shape.
	* @method
	* @returns {Shape} An shape object that is identical to the current shape.
	*/
	copy() {
		return new Shape({
			points: this.points.map(p => p.copy()),
			strokeColor: this.strokeColor,
			fillColor: this.fillColor
		});
	}
}

module.exports = Shape;
