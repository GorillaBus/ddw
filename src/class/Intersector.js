const Utils = require('./Utils');

/**
 * A singleton class that provides a collection of intersection detecting tests between different geometries. This is an essential component of the collision detecting system and it only operates with Shape type objects.
 * @summary View file: {@link https://github.com/GorillaBus/ddw/blob/master/src/class/BodyManager.js https://github.com/GorillaBus/ddw/blob/master/src/class/Intersector.js}.
 * @class
 */
class Intersector {

	/**
	* Given a shape object it will generate a more abstact representation of the rectangle shape that wraps the passed object.
	* @method
	* @param {Shape} shape - A shape object.
	* @returns {Object} Rectangle representation.
	*/
	getBoundingRectangle(shape) {
		return {
			x: shape.bounds.xMin,
			y: shape.bounds.yMin,
			width: shape.width,
			height: shape.height
		};
	}

	/**
	* Given a shape object it will generate a more abstact representation of the circle shape that wraps the passed object.
	* @method
	* @param {Shape} shape - A shape object.
	* @returns {Object} A circle representation.
	*/
	getBoundingCircle(shape) {
		return {
			x: shape.center.getX(),
			y: shape.center.getY(),
			radius: shape.radius
		};
	}

	/**
	* Tests the intersection between a circle shape and a rectangle shape.
	* @method
	* @param {shape} circleShape - A circle shape.
	* @param {shape} rectangleShape - A rectangle shape.
	* @returns {Boolean} True when the shapes intersect each other, else false.
	*/
	circleInRectangle(circleShape, rectangleShape) {
		const circle = this.getBoundingCircle(circleShape)
		const rectangle = this.getBoundingRectangle(rectangleShape);
		const distX = Math.abs(circle.x - rectangle.x - rectangle.width / 2);
		const distY = Math.abs(circle.y - rectangle.y - rectangle.height / 2);
		// Out of range
		if (distX > (rectangle.width / 2 + circle.radius) || distY > (rectangle.height / 2 + circle.radius)) {
			return false;
		}
		// In range
		if (distX <= (rectangle.width / 2) || distY <= (rectangle.height / 2)) {
			return true;
		}
		// Rectangle corners
		const dx = distX - rectangle.width / 2;
		const dy = distY - rectangle.height / 2;
		return (dx * dx + dy * dy <= (circle.radius * circle.radius));
	}

	/**
	* Tests the intersection between two circle shapes.
	* @method
	* @param {shape} circleShape1 - A circle shape.
	* @param {shape} circleShape2 - A circle shape.
	* @returns {Boolean} True when the shapes intersect each other, else false.
	*/
	circleCircle(circleShape1, circleShape2) {
		const circle1 = this.getBoundingCircle(circleShape1);
		const circle2 = this.getBoundingCircle(circleShape2);
		// Get the Distance vector
		const xDist = circle1.x - circle2.x;
		const yDist = circle1.y - circle2.y;
		// We'll save a Math.sqrt() to verify distances like this:
		const distSquared = (xDist * xDist) + (yDist * yDist);
		const radiusSquared = (circle1.radius + circle2.radius) * (circle1.radius + circle2.radius);
		// Collision check
		if (distSquared < radiusSquared) {
			return { x: xDist, y: yDist, dist_squared: distSquared };
		}
		return false;
	}
}

module.exports = new Intersector();
