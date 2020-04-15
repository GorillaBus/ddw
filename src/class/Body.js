const Vector = require('./Vector');
const Utils = require('./Utils');

class Body {

	/**
	 * A <i>Body</i> object is the logical representation of a physical entity in <b>DDW</b>. It has physical proerties like mass, size, a position in the world, it can interact with other <i>Body</i> objects and forces. In <b>DDW</b> the shape of an <i>Body</i> is represented by a (or a set of) polygon(s), described by a set of points in a <i>Model</i> class object.<br/>
	 * A body has a location and velocity vector that describe its position in the world and movement in terms of speed and direction, and an angle and angle velocity properties, representing its current angle position and rotation speed.
	 * @summary View file: {@link https://github.com/GorillaBus/DDW/blob/master/src/class/Body.js https://github.com/GorillaBus/DDW/blob/master/src/class/Body.js}.
	 * @constructor
	 * @param {Object} settings - Json object with construction options
	 * @param {Float} [settings.x=0] - X axis position of the body's center in the world.
	 * @param {Float} [settings.y=0] - Y axis position of the body's center in the world.
	 * @param {Float} [settings.scale=0] - Scale factor.
	 * @param {Float} [settings.angle=0] - The body's orientation angle in radians.
	 * @param {Float} [settings.speed=0] - Movement speed on the current direction.
	 * @param {Float} [settings.mass=1] - The mass of the entity.
	 * @param {Boolean} [settings.visible=true] - Wether this entity is graphicable or not.
	 * @param {Object} settings.model - A Model class object representing the shape of the entity.
	 */
	constructor(settings) {
		settings = settings || {};
		settings.x = settings.x || 0;
		settings.y = settings.y || 0;
    settings.speed = settings.speed || 0;
		settings.heading = settings.heading || 0;

    this.angleAcceleration = 0;
    this.angleVelocity = settings.angleVelocity || 0;
		this.angle = settings.angle || 0;
		this.acceleration = new Vector({ x: 0, y: 0 });
		this.velocity = new Vector({ length: settings.speed, angle: settings.heading });
		this.location = new Vector({ x: settings.x, y: settings.y });
		this.mass = settings.mass || 1;
		this.scale = settings.scale || 1;
		this.uuid = Utils.uniqueID();
    this.model = settings.model;
    this.world = this.getWorldTransform();
	}

	/**
	 * Returns the current rotation angle of the <i>Body</i>.
	 * @method
	 * @returns {float} - Angle in radians.
	 */
  getAngle() {
    return this.angle;
  }

	/**
	 * Returns the radius of the circle that bounds the entity (can sometimes be interpreted as width).
	 * @method
	 * @returns {float} - Radius.
	 */
	getRadius() {
		return this.world.radius;
	}

	/**
	 * Returns the current scale of the <i>Body</i>.
	 * @method
	 * @returns {float} - Scale.
	 */
  getScale() {
    return this.scale;
  }

	/**
	 * Returns the current velocity direction of the _Body, expressed as an angle in radians.
	 * @method
	 * @returns {float} - Angle in radians.
	 */
	getHeading() {
		return this.velocity.getAngle();
	}

	/**
	 * Changes the <i>Body</i>'s current movement direction angle.
	 * @param {Float} - An angle in radians.
	 * @method
	 * @returns {float} - Angle in radians.
	 */
	setHeading(angle) {
		this.velocity.setAngle(angle);
	}

	/**
	 * Returns the current movement speed of the _Body.
	 * @method
	 * @returns {float} - Speed.
	 */
	getSpeed() {
		return this.velocity.getLength();
	}

	/**
	 * Change the <i>Body</i>'s current movement speed.
	 * @param {Float} - The desired speed.
	 * @method
	 * @returns {float} - Angle in radians.
	 */
	setSpeed(speed) {
		this.velocity.setLength(speed);
	}

	/**
	 * Returns the current location vector of the <i>Body</i>.
	 * @method
	 * @returns {float} - Speed.
	 */
  getLocation() {
    return this.location;
  }

	/**
	 * Set a new position for the entity.
	 * @param {Vector} - The desired position expressed as a <i>Vector</i> class object.
	 * @method
	 */
	setPosition(position) {
		this.location = position;
	}

	/**
	 * Returns <i>Body</i>'s bounding recangle, which is defined as four points polygonal shape that bounds the total of the points that compose the <i>Body</i>'s model. Can be used to verify the geometrical intersection between a <i>Body</i> and other entities.
	 * @method
	 * @returns {Array} - An array of four coordinate points (as sub-arrays with X [0] and Y [1] values).
	 */
	getBoundingRect() {
		return [
			[this.world.bounds.xMin, this.world.bounds.yMin],
			[this.world.bounds.xMin, this.world.bounds.yMax],
			[this.world.bounds.xMax, this.world.bounds.yMax],
			[this.world.bounds.xMax, this.world.bounds.yMin]
		];
	}

	/**
	 * Updates the state of <i>Body</i>'s object in the world: its position, velocity, angle and rotating speed. It also updates the world-transformation of the model that represents the entity.
	 * @method
	 */
	update() {
    // Update Position
		this.velocity.addTo(this.acceleration);
		this.location.addTo(this.velocity);
		this.acceleration.multiplyBy(0);
    // Update angle
    this.angleVelocity += this.angleAcceleration;
    this.angle += this.angleVelocity;
    this.angleAcceleration = 0;
    // World transformation
    this.world = this.getWorldTransform();
	}

	/**
	 * Performs a world-transformation on the <i>Body</i>'s model. This method is executed on each time step to reflect the entity's geometrical representation in the world.
	 * @method
	 * @returns {Model} - The new transformed <i>Model</i> class object.
	 */
  getWorldTransform() {
    return this.model.transform(this.angle, this.scale, [this.location.getX(), this.location.getY()]);
  }

	/**
	 * Applies a force to the entity, expressed as a <i>Vector</i> class object. The magnitude of the force is divided by the <i>Body</i>'s mass.
	 * @method
	 */
	applyForce(force) {
		let f = force.divide(this.mass);
		this.acceleration.addTo(f);
	}

	/**
	 * Applies a force to the entity, expressed as a <i>Vector</i> class object. This magnitude of the force will not be divided by the _Body's_ mass.
	 * @method
	 */
	applyNetForce(force) {
		this.acceleration.addTo(force);
	}

	/**
	 * Resets the velocity magnitude (speed) to zero.
	 * @method
	 */
	resetVelocity() {
		this.velocity.multiplyBy(0);
	}

	/**
	 * Calculates the distance from one <i>Body</i> object to another, from surface to surface.
	 * @method
	 * @returns {Model} - The new transformed <i>Model</i> class object.
	 */
	distanceTo(target) {
		return target.location.substract(this.location).getLength() - this.getRadius() - target.getRadius();
	}

}

module.exports = Body;
