const Vector = require('./Vector');

class Shape {

	constructor(settings) {
		this.points = settings.points.map(p => {
			return new Vector({ x: p.x, y: p.y });
		});
		this.visible = settings.visible === false ? false:true;
		this.bounds = this.getBounds();
		this.center = this.getCenter();
		this.width = this.bounds.xMax - this.bounds.xMin;
		this.height = this.bounds.yMax - this.bounds.yMin;
		this.radius = Math.max(this.width, this.height) / 2;
		this.strokeColor = settings.strokeColor;
		this.fillColor = settings.fillColor;
	}

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

	getCenter() {
		return new Vector({
			x: (this.bounds.xMin + this.bounds.xMax) / 2,
			y: (this.bounds.yMin + this.bounds.yMax) / 2
		});
	}

	copy() {
		return new Shape({
			points: this.points.map(p => p.copy()),
			strokeColor: this.strokeColor,
			fillColor: this.fillColor
		});
	}
}

module.exports = Shape;
