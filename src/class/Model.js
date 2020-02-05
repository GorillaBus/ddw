const Vector = require('./Vector');
const Shape = require('./Shape');

class Model {
	constructor(settings) {
		this.debugColor = settings.debugColor || "#94ec5d";
		this.shapes = this.loadShapes(settings.shapes);
		this.bounds = this.getBounds();
		this.boundingBox = this.getBoundingBox();
	}

	loadShapes(shapes) {
		return shapes.map(m => this.createShape(m));
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

	getBoundingBox(settings) {
		return this.createShape({
			points: [{
				x: this.bounds.xMin,
				y: this.bounds.yMin,
			},{
				x: this.bounds.xMin,
				y: this.bounds.yMax,
			},{
				x: this.bounds.xMax,
				y: this.bounds.yMax,
			},{
				x: this.bounds.xMax,
				y: this.bounds.yMin,
			}],
			strokeColor: this.debugColor
		});
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

		return new Model({
			debugColor: this.debugColor,
			shapes: shapeData
		});
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
		return new Model({
			debugColor: this.debugColor,
			shapes: shapeData
		});
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
		return new Model({
			debugColor: this.debugColor,
			shapes: shapeData
		});
	}

}

module.exports = Model;
