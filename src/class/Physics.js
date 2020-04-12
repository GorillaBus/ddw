const Vector = require('./Vector');

class Physics {

  constructor(settings) {
    settings = settings || {};
    this.G = settings.G || 9.8;
  }

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

			// Collision Vector:
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

  orbitDistanceBySpeed(body, target, speed) {
    return (body.mass * target.mass) / speed;
  }

  orbitSpeedByDistance(body, target, G) {
    G = G || 9.8;
    const distance = body.distanceTo(target);
    return Math.sqrt((G * target.mass) / distance);
  }

}

module.exports = new Physics();
