const Vector = require('./Vector');
const Shape = require('./Shape');

class Model {

	/**
	* A graphicable representation of a body object, compound by one or more shape objects that can be transformed, projected and drawn. Model templates are defined in json format (check src/models/ for examples).
	* @summary View file: {@link https://github.com/GorillaBus/ddw/blob/master/src/class/BodyManager.js https://github.com/GorillaBus/ddw/blob/master/src/class/Model.js}.
	* @constructor
	* @param {Object} settings - Json object with construction options.
	* @param {String} settings.debugColor - A default color used mainly for debugging cases.
	*/
	constructor(settings) {
		this.debugColor = settings.debugColor || "#94ec5d";
		this.shapes = this.loadShapes(settings.shapes);
		this.scale = 1;
		this.bounds = this.getBounds();
		this.boundingBox = this.getBoundingBox();
	}

	/**
	* Creates a shape object for each polygon.
	* @method
	* @param {Array} shapesData - An array of json objects defining each shape.
	* @returns {Array} An array of shape objects.
	*/
	loadShapes(shapesData) {
		return shapesData.map(shapeData => this.createShape(shapeData));
	}

	/**
	* Computes the maximum and minimum magnitures between all the model's points over each (x,y) axis.
	* @method
	* @returns {Object} A json object with max and min values for the two axis.
	*/
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

	/**
	* Generates the model's bounding box, which is a shape object defined by four points as the rectangular shape that bounds the total points that compose the body's model.
	* @method
	* @param {} xxx - xxx
	* @returns {} xxx
	*/
	getBoundingBox() {
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

	/**
	* Gets all the shapes from the model.
	* @method
	* @returns {Array} An array of shape objects.
	*/
	getShapes() {
		return this.shapes;
	}

	/**
	* Sets a particular shape's visibility to false making it invisible.
	* @method
	* @param {Int} index - The index of the shape in the array.
	*/
	hide(index) {
		this.shapes[index].visible = false;
	}

	/**
	* Sets a particular shape's visibility to true making it visible.
	* @method
	* @param {Int} index - The index of the shape in the array.
	*/
	show(index) {
		this.shapes[index].visible = true;
	}

	/**
	* Creates a shape object given a json object with shape definition data.
	* @method
	* @param {object} shapeData - Shape definition data.
	* @returns {Shape} A shape object.
	*/
	createShape(shapeData) {
		return new Shape({
			points: shapeData.points,
			visible: shapeData.visible,
			strokeColor: shapeData.strokeColor,
			fillColor: shapeData.fillColor
		});
	}

	/**
	* Applies a transformation to every shape that conforms the model. It expects rotation, scale and translation values to be applied equaly to each model's shape.
	* @method
	* @param {Float} r - Rotation angle in radians.
	* @param {Float} s - Scale factor.
	* @param {Vector} t - Translation vector.
	* @returns {Model} The resulting model after applying the transformation.
	*/
	transform(r, s, t) {
		t = t || new Vector();
		const shapeData = [];
		for (let i=0,len=this.shapes.length; i<len; i++) {
			const shape = this.shapes[i];
			const transformedPoints = [];
			for (let j=0,len=shape.points.length; j<len; j++) {
				const newPoint = shape.points[j].copy();
				newPoint.rotateBy(r);
				newPoint.multiplyBy(s);
				newPoint.addTo(t)
				transformedPoints.push({
					x: newPoint.getX(),
					y: newPoint.getY()
				});
			}
			shapeData.push({
				points: transformedPoints,
				visible: shape.visible,
				fillColor: shape.fillColor,
				strokeColor: shape.strokeColor
			});
		}
		return new Model({
			debugColor: this.debugColor,
			shapes: shapeData
		});
	}

	/**
	* Identical to transform but using the scale of a "view", this should be replaced for transform().
	* @method
	* @param {Body} xxx - xxx
	* @returns {Model} The resulting model aftera applying the transformations.
	*/
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

	/**
	* A variation of 'transform' that takes a body object as a transformation reference (for view/camera transformations).
	* @method
	* @param {Body} reference - A reference body object.
	* @returns {Model} The resulting model after applying the transformation.
	*/
	transformView(view) {
		const r = -view.getAngle();
		const s = view.getScale() / this.scale;
		const t = view.getLocation().multiply(-1);
		return this.transform(r, s, t);
	}
}

module.exports = Model;
