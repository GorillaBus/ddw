const Body = require("./Body");

class Viewport extends Body {

	/**
	* An extension of the body class that works as a view-reference. It provides functionality to be moved around (translated, rotated, scaled). It can be attached to other body objects in a scene to display the attached body's view. Scaling this object will work as a camera zoom.<br/>The viewport object constructs a model positioned in the center of the screen by default.
	* @summary View file: {@link https://github.com/GorillaBus/ddw/blob/master/src/class/BodyManager.js https://github.com/GorillaBus/ddw/blob/master/src/class/Viewport.js}.
	* @constructor
	*	@inherits Body
	* @param {Object} settings - Json object with construction options.
	* @param {Float} settings.width - The width of the viewport object.
	* @param {Float} settings.height - The height of the viewport object.
	*/
	constructor(settings) {
		const x = settings.width / 2;
		const y = settings.height / 2;
		super({
				x: 0,
				y: 0,
				angle: 0,
				scale: settings.scale,
				modelData: {
					debugColor: "#ffffff",
					shapes: [{
						visible: false,
						points: [
							{ x: -x, y: -y },
							{ x, y: -y },
							{ x, y },
							{ x: -x, y }
						]
					}]
				}
			});

		this.attachedTo = settings.attachedTo || false;
	}

	/**
	* Attaches the viewport to a body object following it's position constantly to achieve the effect of a following camera. Used to display the view reference of the given body object.
	* @method
	* @param {Body} body - A body object.
	*/
	attachTo(body) {
		this.attachedTo = body;
		this.location = body.location;
	}

	/**
	* Detaches the viewport from any previously attached body object. The viewport is left at the location of the attached body before detachment.
	* @method
	*/
	detach() {
		this.location = this.attachedTo.copy();
		this.attachedTo = null;
	}

	/**
	* Rotates the viewport to the left, when not attached to some other body.
	* @method
	* @param {Float} [magnitude=0.1] - Rotation magnitude in radians. 
	*/
	rotateLeft(magnitude) {
		magnitude = magnitude || 0.1;
		if (this.attachedTo) return;
		this.angle -= magnitude;
	}

	/**
	* Rotates the viewport to the right, when not attached to some other body.
	* @method
	* @param {Float} [magnitude=0.1] - Rotation magnitude in radians.
	*/
	rotateRight(magnitude) {
		magnitude = magnitude || 0.1;
		if (this.attachedTo) return;
		this.angle += magnitude;
	}

	/**
	* Scales the viewport up generating a zoom-out effect
	* @method
	* @param {Float} [factor=0.01] - Scaling factor.
	*/
	scaleUp(factor) {
		factor = factor || 0.01;
		this.scale -= factor;
	}

	/**
	* Scales the viewport down generating a zoom-in effect
	* @method
	* @param {Float} [factor=0.01] - Scaling factor.
	*/
	scaleDown(factor) {
		factor = factor || 0.01;
		this.scale += factor;
	}

	/**
	* Adds to the location vector of the viewport to move it along the x,y axis, when not attached to some other body object.
	* @method
	* @param {x} x - Magnitude along the x axis.
	* @param {y} y - Magnitude along the y axis.
	*/
	move(x, y) {
		if (this.attachedTo) return;
		this.location.setX(this.location.getX() + x);
		this.location.setY(this.location.getY() + y);
	}

	/**
	* Gets the viewport's (or the attached body's) location vector.
	* @method
	* @returns {Vector} The viewport's location.
	*/
	getLocation() {
		return this.attachedTo ? this.attachedTo.location : this.location;
	}

	/**
	* Sets the viewport location to the given vector.
	* @method
	* @param {Vector} location - A location vector.
	*/
	setLocation(location) {
		this.location = location;
	}

	/**
	* Gets the current scale of the viewport.
	* @method
	* @returns {Float} The scale factor of the viewport.
	*/
	getScale() {
		return this.scale;
	}

	/**
	* Sets the scale of the viewport to a fixed value.
	* @method
	* @param {Float} scale - A scaling factor.
	*/
	setScale(scale) {
		this.scale = scale;
	}

	/**
	* Gets the current viewport scale.
	* @method
	* @returns {Float} An angle in radians.
	*/
	getAngle() {
		return this.angle;
	}

	/**
	* Sets the rotation angle of the viewport to a fixed value.
	* @method
	* @param {Float} angle - A fixed angle value.
	*/
	setAngle(angle) {
		this.angle = angle;
	}
}

module.exports = Viewport;
