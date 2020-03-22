const Vector = require('./Vector');
const Utils = require('./Utils');

class Body {

	constructor(settings) {
		settings = settings || {};
		settings.x = settings.x || 0;
		settings.y = settings.y || 0;
    settings.speed = settings.speed || 0;
    this.angleAcceleration = 0;
    this.angleVelocity = settings.angleVelocity || 0;
		this.angle = settings.angle || 0;
		this.acceleration = new Vector({ x: 0, y: 0 });
		this.velocity = new Vector({ length: settings.speed, angle: this.angle });
		this.location = new Vector({ x: settings.x, y: settings.y });
		this.mass = settings.mass || 1;
		this.scale = settings.scale || 1;
		this.uuid = Utils.uniqueID();
    this.model = settings.model;
    this.world = null;
	}

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
    this.world = this.model.transform(this.angle, this.scale, [this.location.getX(), this.location.getY()]);
	}

	setPosition(position) {
		this.location = position;
	}

	applyForce(force) {
		let f = force.divide(this.mass);
		this.acceleration.addTo(f);
	}

	applyNetForce(force) {
		this.acceleration.addTo(force);
	}

	resetVelocity() {
		this.velocity.multiplyBy(0);
	}

}

module.exports = Body;
