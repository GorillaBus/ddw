const Vector = require('./Vector');

class CollisionResolver {

	elastic(body1, body2, intersection) {

		// Displacement vector (difference in velocity)
		const xVelocity = body2.velocity.getX() - body1.velocity.getX();
		const yVelocity = body2.velocity.getY() - body1.velocity.getY();

		// If both bodies are moving away from each other, discard collision
		const dotProduct = (intersection.x * xVelocity) + (intersection.y * yVelocity);

		// Collision handling
		if (dotProduct > 0) {

			// The resulting force from the collision (angle difference + velocity difference)
			let collisionScale = dotProduct / intersection.dist_squared;

			// Collision Vector:
			let collision = {
				x: intersection.x * collisionScale,
				y: intersection.y * collisionScale
			};

			// 2D Elastic collision
			let combinedMass = body1.mass + body2.mass;
			let collisionWeight0 = (2 * body2.mass / combinedMass) * 0.5; // 0.5 is restitution
			let collisionWeight1 = (2 * body1.mass / combinedMass) * 0.5;

			const collisionResult1 = new Vector({
				x: collisionWeight0 * collision.x,
				y: collisionWeight0 * collision.y
			});

			const collisionResult2 = new Vector({
				x: collisionWeight1 * collision.x,
				y: collisionWeight1 * collision.y
			})
			.multiply(-1);

			body1.applyNetForce(collisionResult1);
			body2.applyNetForce(collisionResult2);
		}
	}
}

module.exports = CollisionResolver;
