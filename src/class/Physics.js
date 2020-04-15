const Vector = require('./Vector');

class Physics {

  /**
   * A singleton class that performs all physics computations between physical entities (like <i>Body</i> objects) in <i>DDW</i>.
   * @summary View file: {@link https://github.com/GorillaBus/ddw/blob/master/src/class/Collision.js https://github.com/GorillaBus/ddw/blob/master/src/class/Physics.js}.
   * @constructor
   * @param {Object} settings - A Json object with construction parameters.
   * @param {Float} [settings.G=9.8] - Gravity constant, a factor for many physical events.
   */
  constructor(settings) {
    settings = settings || {};
    this.G = settings.G || 9.8;
  }

  /**
   * Computes and applies the attraction force from a given source-target <i>Body</i> pair, with the formula "F = G * M * (m / r2)". The magnitude will depend on both object's mass, distance and current speeds.<br/>
   * <b>Note</b> that this method will not apply any force if both bodies are intersecting.
   * @method
   * @param {Body} target - The target body to compute the gravitation force.
   * @param {Float} [G=1] - Gravity force factor.
   * @returns {Vector} A vector representing the gravity full force to the target body.
   */
  gravity(source, target) {
		const dir = target.location.substract(source.location);
		const distance = dir.getLength();
		const minDistance = target.getRadius() + source.getRadius();
		if (minDistance > distance) {
			return;
		}
		const force = this.G * (source.mass * target.mass / (distance * distance));
		dir.normalize();
		dir.multiplyBy(force);
		source.applyForce(dir);
	}

  /**
   * Computes and applies the forces resulting from the collision of two bodies (<i>Body</i> class objects), based in their velocities (speeds and directions) at the moment of impact (which is always approximative, as bodies most of the times bodies will be overlaping at the time being checked). Once a collision between a pair of <i>Body</i> objects has been resolved it will never be resolved again during the current iteration: only entitiy pair where at least one is heading towards the other are resolved, a situation that is not possible after a the collision forces are applied to the pair of bodies.<br/>
   * As an optimization we are save a Math.sqrt() when calculating the distance between the two bodies, as we don't require its meassure.
   * @method
   * @param {Body} source - Usually the fist level <i>Body</i> object whithin <b>DDW</b>'s main iteration.
   * @param {Body} target - The <i>Body</i> to which the source is being checked.
   * @param {Object} intersection - An Json object containing the X and Y components of the vector from the center of the source to the center of the target body, and the square of the distance between them (as we don't require the meassure, we can save a Math.sqrt() when computing the distance).
   * @returns {Vector} A vector representing the gravity full force to the target body.
   */
  elasticCollision(source, target, intersection) {

		// Displacement vector (difference in velocity)
		const xVelocity = target.velocity.getX() - source.velocity.getX();
		const yVelocity = target.velocity.getY() - source.velocity.getY();

		// If both bodies are moving away from each other, discard collision
		const dotProduct = (intersection.x * xVelocity) + (intersection.y * yVelocity);

		// Collision handling
		if (dotProduct > 0) {

			// The resulting force from the collision (angle difference + velocity difference)
			const collisionScale = dotProduct / intersection.dist_squared;

			// Collision Vector
			const collision = {
				x: intersection.x * collisionScale,
				y: intersection.y * collisionScale
			};

			// Restitution aproximation
			const totalDensity = source.density + target.density;
			const r1 = (source.density / totalDensity) / 2;
			const r2 = (target.density / totalDensity) / 2;

			// 2D Elastic collision
			const combinedMass = source.mass + target.mass;
			const collisionWeight1 = (2 * target.mass / combinedMass) * 0.1;
			const collisionWeight2 = (2 * source.mass / combinedMass) * 0.25;
			const collisionResult1 = new Vector({
				x: collisionWeight1 * collision.x,
				y: collisionWeight1 * collision.y
			});
			const collisionResult2 = new Vector({
				x: collisionWeight2 * collision.x,
				y: collisionWeight2 * collision.y
			})
			.multiply(-1);

			source.applyNetForce(collisionResult1);
			target.applyNetForce(collisionResult2);
		}
	}

  /**
   * Calculates the required distance that a body requires to achieve a stable orbit around a target body, given a desired speed.
   * <b>Note</b> that, for optimization reasons, this method will not check for intersection between both radius, its up to the user to verify that the given distance is greater than the sum of both radiuses.
   * @method
   * @param {Body} body - The orbiting <i>Body</i> object.
   * @param {Body} target - The target <i>Body</i>.
   * @param {Float} speed - The desired orbit speed for the first body.
   * @returns {Float} The required speed at which the body should orbit the target given their properties and distance.
   */
  orbitDistanceBySpeed(body, target, speed) {
    return (body.mass * target.mass) / speed;
  }

  /**
   * Calculates the required speed that a body requires to achieve a stable orbit around a target body.
   * @method
   * @param {Body} body - The <i>Body</i> object to orbit the target.
   * @param {Body} target - The target <i>Body</i>.
   * @returns {Float} The required speed at which the first body should orbit the target, given their properties and distance.
   */
  orbitSpeedByDistance(body, target, G) {
    G = G || 9.8;
    const distance = body.distanceTo(target);
    return Math.sqrt((G * target.mass) / distance);
  }

}

module.exports = new Physics();
