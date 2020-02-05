const Vector = require('./Vector');
const Shape = require('./Shape');

class Model {
	constructor(settings) {
		this.shapes = this.loadShapes(settings);
		this.bounds = this.getBounds();
		this.center = this.getCenter();
		this.width = 0;
		this.height = 0;
		this.radius = 0;
		this.initDimensions();
	}

	loadShapes(modelData) {
		return modelData.map(m => this.createShape(m));
	}

	getBounds() {
		const bounds = this.shapes.reduce((acum, curr) => {
			acum.xMin.push(curr.bounds.xMin);
			acum.xMax.push(curr.bounds.xMax);
			acum.yMin.push(curr.bounds.yMin);
			acum.yMax.push(curr.bounds.yMax);
			return acum;
		}, { xMin: [], xMax: [], yMin: [], yMax: [] });

		return {
			xMin: Math.min.apply(null, bounds.xMin),
			xMax: Math.max.apply(null, bounds.xMax),
			yMin: Math.min.apply(null, bounds.yMin),
			yMax: Math.max.apply(null, bounds.yMax)
		};
	}

	getBoundingBox() {
		return {
			x: this.bounds.xMin,
			y: this.bounds.yMin,
			width: this.width,
			height: this.height
		};
	}

	getCenter() {
		return new Vector({
			x: (this.bounds.xMin + this.bounds.xMax) / 2,
			y: (this.bounds.yMin + this.bounds.yMax) / 2
		});
	}

	initDimensions() {
		this.width = this.bounds.xMax - this.bounds.xMin;
		this.height = this.bounds.yMax - this.bounds.yMin;
		this.radius = Math.max(this.width, this.height) / 2;
	}

	getShapes() {
		return this.shapes;
	}

	hide(idx) {
		this.shapes[idx].visible = false;
	}

	show(idx) {
		this.shapes[idx].visible = true;
	}

	createShape(shapeData) {
		return new Shape({
			points: shapeData.points,
			visible: shapeData.visible,
			strokeColor: shapeData.strokeColor,
			fillColor: shapeData.fillColor
		});
	}

	transform(r, s, t) {
		t = t || new Vector();

		const shapeData = this.shapes.map(shape => {
			const transformedPoints = shape.points.map(point => {
				const newPoint = point.copy();
				newPoint.rotateBy(r);
				newPoint.multiplyBy(s);
				newPoint.addTo(t)
				return {
					x: newPoint.getX(),
					y: newPoint.getY()
				};
			});
			return {
				points: transformedPoints,
				visible: shape.visible,
				fillColor: shape.fillColor,
				strokeColor: shape.strokeColor
			};
		});

		return new Model(shapeData);
	}

	transformViewpoint(view, r, s) {
		const shapeData = this.shapes.map(shape => {
			const transformedPoints = shape.points.map(point => {
				const newPoint = point.copy();
				newPoint.rotateBy(r);
				newPoint.multiplyBy(s);
				newPoint.divideBy(view.scale);
				return { x: newPoint.getX(), y: newPoint.getY() };
			});
			return {
				points: transformedPoints,
				visible: shape.visible,
				fillColor: shape.fillColor,
				strokeColor: shape.strokeColor
			};
		});
		return new Model(shapeData);
	}

	transformView(view) {
		const shapeData = this.shapes.map(shape => {
			const location = view.getLocation();
			const scale = view.getScale();
			const angle = view.getAngle();

			const transformedPoints = shape.points.map(point => {
				const newPoint = point.copy();
				newPoint.substractFrom(location);
				newPoint.rotateBy(-angle);
				newPoint.divideBy(scale === 0 ? 1 : scale);
				return { x: newPoint.getX(), y: newPoint.getY() };
			});
			return {
				points: transformedPoints,
				visible: shape.visible,
				fillColor: shape.fillColor,
				strokeColor: shape.strokeColor
			};

		});
		return new Model(shapeData);
	}

}

module.exports = Model;
