const Utils = require('./Utils');
const Vector = require('./Vector');
const Model = require('./Model');

class Body {

/**
 * Represents a basic physical entity in DDW. As a virtual physical object it has mass, a shape (described by a set of points), a position in the world and can be affected by forces. A body can iterate with other bodies in the world, for example, by collision, gravity pull, repealing, etc. In DDW the shape of an Body is represented by a Model object that can be transformed to model, world and view. It also contains animation functionality. A body has a position vector to define its location in the world, a velocity vector that describes the body's movement and an acceleration vector to which forces are applied to affect the body's velocity.<br/><br/>To facilitate different tasks like broad-phase collision detection a bounding box is always computed for each Body. This bounding box is accesible by the body's model object as well as the radius of its bounding circle.
 * @summary View file: {@link https://github.com/GorillaBus/ddw/blob/master/src/class/Body.js https://github.com/GorillaBus/ddw/blob/master/src/class/Body.js}.
 * @constructor
 * @param {Object} settings - Json object with construction options
 * @param {Float} [settings.x=0] - X axis position of the body's center in the world.
 * @param {Float} [settings.y=0] - Y axis position of the body's center in the world. 0 by default.
 * @param {Float} [settings.scale=0] - Scale factor. 1 by default.
 * @param {Float} [settings.angle=0] - The body's orientation angle in radians. 0 by default.
 * @param {Float} [settings.speed=0] - Movement speed on the current direction. 0 by default.
 * @param {Float} [settings.width=0] - Float	The width of the entity. 0 by default.
 * @param {Float} [settings.height=0] - The height of the entity. 0 by default.
 * @param {Float} [settings.radius=0] - The radius of the entity. 0 by default.
 * @param {Boolean} [settings.visible=true] - Wether this entity is graphicable or not. True by default.
 * @param {Object} settings.modelData - A array of json objects defining the shapes that composes the body's model.
 */
	constructor(settings) {
		settings = settings || {};
		settings.x = settings.x || 0;
		settings.y = settings.y || 0;

		this.scale = settings.scale || 1;
		this.angle = settings.angle || 0;
		this.speed = settings.speed || 0;
		this.mass = settings.mass || 1;

		this.acceleration = new Vector({ x: 0, y: 0 });
		this.velocity = new Vector({ length: this.speed, angle: this.angle });
		this.location = new Vector({ x: settings.x, y: settings.y });

		// Dimensions
		this.width = settings.width || 0;
		this.height = settings.height || 0;
		this.radius = settings.radius || 0;

		this.uuid = Utils.uniqueID();
		this.visible = settings.visible === false ? false:true;

		// Last world transform
		this.worldTransform = {};

		// Last view transform
		this.viewTransform = {};

		// Model
		this.model = new Model(settings.modelData);


		// Do we need this ????
		this.transformToWorld();
	}

/**
 * Updates the body's state in the world by adding acceleration to velocity and velocity to position vector. Acceleration is finally reseted.
 * @method
 */
	update() {
		this.velocity.addTo(this.acceleration);
		this.location.addTo(this.velocity);
		this.transformToWorld();
		this.acceleration.multiplyBy(0);
	}

/**
 * Returns the body's radius, defined as it's largest prolongation along one of the two axis.
 * @method
 * @returns {float} - Radius
 */
	getRadius() {
		return this.worldTransform.boundingBox.radius;
	}

/**
 * Returns the body's width, defined as the maximum distance between each of the points that compose the body's model over the X axis. This will be equal to the width of the body's bounding box.
 * @method
 * @returns {Float} with
 */
	getWidth() {
		return this.worldTransform.width;
	}

/**
 * Returns the body's height, defined as the maximum distance between each of the points that compose the body's model over the Y axis. This will be equal to the height of the body's bounding box.
 * @method
 * @returns {Float} height
 */
	getHeight() {
		return this.worldTransform.height;
	}

/**
 * Returns body's bounding box, defined as the rectangular shape that bounds the total of the points that compose the body's model.
 * @method
 * @param {Vector} force - A force to be applied to the body
 * @returns {Shape} bounding box
 */
	getBoundingBox() {
		return this.worldTransform.boundingBox;
	}

/**
 * Sets the body's location vector to a given position
 * @method
 * @param {Vector} position - The target position vector
 */
	setPosition(position) {
		this.location = position;
	}

	/**
	 * Given a Vector representing a force it will divide it by the entity's mass and add the result to it's acceleration
	 * @method
	 * @param {Vector} force - A force to be applied to the body
	 */
	applyForce(force) {
		let f = force.divide(this.mass);
		this.acceleration.addTo(f);
	}

	/**
	 * A variation of applyForce that will add to the body's acceleration without dividing by its mass, as a net force.
	 * @method
	 * @param {Vector} force - A force to be applied to the body
	 */
	applyNetForce(force) {
		this.acceleration.addTo(force);
	}

/**
 * Resets the velocity vector to 0. Usually executed after every update to reset force accumulation.
 * @method
 */
	resetVelocity() {
		this.velocity.multiplyBy(0);
	}

/**
 * Performs a world transformation on the body's model. This method is executed on each time step to reflect the body's state in the world (position, velocity and scale).
 * @method
 */
	transformToWorld() {
		this.worldTransform = this.model.transform(this.angle, this.scale, this.location);
	}

/**
 * Performs a view transformation on the body's model (that has already been transformed to world). If the given reference is the viewport itself,Usually used to display the camera's view of the world.
 * @method
 * @param {Body} reference - A view reference body object.
 */
	transformToView(reference) {
		const isViewport = this.uuid === reference.attachedTo.uuid;

		if (isViewport) {
			//this.viewTransform = this.model.transformViewpoint(reference, this.angle, this.scale);

		} else {

			this.viewTransform = this.worldTransform.transformView(reference);
		}


	}

/**
 * Computes the attraction force from a given body with the formulat "F = G * M * (m / r2)". The magnitude will depend on both object's mass, distance and current speeds. This method will avoid applying any force if both bodies are intersecting.
 * @method
 * @param {Body} target - The target body to compute the gravitation force.
 * @param {Float} [G=1] - Gravity force factor.
 * @returns {Vector} A vector representing the gravity full force to the target body.
 */
	gravitateTo(target, G) {
		G = G || 1;
		const diff = target.location.substract(this.location);
		const distance = diff.getLength();
		const minDistance = target.getRadius() + this.getRadius();
		if (minDistance > distance) {
			return;
		}
		const M = this.mass + target.mass;
		const force = G * M * (target.mass / (distance * distance));
		diff.normalize();
		diff.multiplyBy(force);
		this.velocity.addTo(diff);
		return force;
	}
}

module.exports = Body;
