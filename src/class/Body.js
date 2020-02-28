const Utils = require('./Utils');
const Vector = require('./Vector');
const Model = require('./Model');

/**
 *
 * @description Represents a physical body that can interact with forces and other objects
 * {@link https://github.com/GorillaBus/ddw/blob/master/src/class/Body.js GitHub}.
 *
 */
class Body {

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

		this.transformToWorld();
	}

	update() {
		this.velocity.addTo(this.acceleration);
		this.location.addTo(this.velocity);
		this.acceleration.multiplyBy(0);
	}

	getRadius() {
		return this.worldTransform.boundingBox.radius;
	}

	getWidth() {
		return this.worldTransform.width;
	}

	getHeight() {
		return this.worldTransform.height;
	}

	getBoundingBox() {
		return this.worldTransform.boundingBox;
	}

	setPosition(vec) {
		this.location = vec;
	}

	/**
	 * Given a Vector representing a force it will divide it by the entity's mass and add the result to it's acceleration
	 * @method
	 * @param {Vector} force - A force to be applied to the body
	 * @returns None
	 *
	 */
	applyForce(force) {
		let f = force.divide(this.mass);
		this.acceleration.addTo(f);
	}

	/**
	 * Applies the given force vector adding it directly to the body's acceleration vector
	 * @method
	 * @param {Vector} force - A force to be applied to the body
	 * @returns None
	 *
	 */
	applyNetForce(force) {
		this.acceleration.addTo(force);
	}

	resetVelocity() {
		this.velocity.multiplyBy(0);
	}

	transformToWorld() {
		this.worldTransform = this.model.transform(this.angle, this.scale, this.location);
	}

	transformToView(view) {
		this.viewTransform = (this.uuid === view.attachedTo.uuid) ?
		this.model.transformViewpoint(view, this.angle, this.scale) : this.worldTransform.transformView(view);
	}

	gravitateTo(target, G) {
		G = G || 1;

		const diff = target.location.substract(this.location);
		const distance = diff.getLength();
		const minDistance = target.getRadius() + this.getRadius();

		// Avoid gravity force if bodies are intersected
		if (minDistance > distance) {
			return;
		}

		// F = G * M * (m / r2)
		const M = this.mass + target.mass;
		const force = G * M * (target.mass / (distance * distance));
		diff.normalize();
		diff.multiplyBy(force);
		this.velocity.addTo(diff);
		return force;
	}

}

module.exports = Body;
