const Utils = require('./Utils');

class Intersector {

	getBoundingRectangle(shape) {
		return {
			x: shape.bounds.xMin,
			y: shape.bounds.yMin,
			width: shape.width,
			height: shape.height
		};
	}

	getBoundingCircle(shape) {
		return {
			x: shape.center.getX(),
			y: shape.center.getY(),
			radius: shape.radius
		};
	}

	pointsInsideRectangle(pointShapes, rectangleShape) {
		const points = pointShapes.map(p => p.center)
		const rectangle = this.getBoundingRectangle(rectangleShape);
		for (let i=0, len=points.length; i<len; i++) {
			const p = points[i];
			if (this.pointInRectangle(p, rectangle)) {
				return true;
			}
		}
		return false;
	}

	pointInRectangle(pointShape, rectangleShape) {
		const point = pointShape.center;
		const rectangle = this.getBoundingRectangle(rectangleShape);
		return Utils.inRange(point.getX(), rectangle.x, rectangle.x + rectangle.width) &&
		Utils.inRange(point.getY(), rectangle.y, rectangle.y + rectangle.height);
	}

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

module.exports = Intersector;
