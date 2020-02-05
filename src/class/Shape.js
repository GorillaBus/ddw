const Vector = require('./Vector');

class Shape {

	constructor(settings) {
		this.points = settings.points.map(p => {
			return new Vector({ x: p.x, y: p.y });
		});
		this.visible = settings.visible === false ? false:true;
		this.bounds = this.getBounds();
		this.boundingBox = this.getBoundingBox();

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

	getBoundingBox() {
		return [
			new Vector({ x: this.bounds.xMin, y: this.bounds.yMin }),
			new Vector({ x: this.bounds.xMax, y: this.bounds.yMin }),
			new Vector({ x: this.bounds.xMax, y: this.bounds.yMax }),
			new Vector({ x: this.bounds.xMin, y: this.bounds.yMax }),
		];
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
