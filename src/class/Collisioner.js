const Utils = require('./Utils');
const Shape = require('./Shape');

class Collisioner {

	constructor(settings) {
		this.intersector = settings.intersector;
	}

	rectangleCollision(a, b) {
		const a_width = a.bounds.xMax - a.bounds.xMin;
		const a_height = a.bounds.yMax - a.bounds.yMin;
		const b_width = b.bounds.xMax - b.bounds.xMin;
		const b_height = b.bounds.yMax - b.bounds.yMin;

		return Utils.rangeIntersect(a.boundingBox[0].getX(), a.boundingBox[0].getX() + a_width, b.boundingBox[0].getX(), b.boundingBox[0].getX() + b_width) &&
		Utils.rangeIntersect(a.boundingBox[0].getY(), a.boundingBox[0].getY() + a_height, b.boundingBox[0].getY(), b.boundingBox[0].getY() + b_height);
	}


	pointsInsideRectBody(points, body, ctx) {

		// Rotate the body back to model default
		const transformedPoints = body.model.points.map(point => {
			const p = point.copy();
			p.rotateBy(0);
			p.multiplyBy(body.scale);
			p.addTo(body.location)
			return { x: p.getX(), y: p.getY() };
		});
		const rectShape = new Shape({
			points: transformedPoints
		});
		const rect = {
			x: rectShape.bounds.xMin,
			y: rectShape.bounds.yMin,
			width: rectShape.bounds.xMax - rectShape.bounds.xMin,
			height: rectShape.bounds.yMax - rectShape.bounds.yMin
		};


		// Debug draw
		// ctx.beginPath();
		// ctx.fillStyle = "rgba(0, 255, 0, 0.03)";
		// ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
		// ctx.closePath();
		// ctx.fill();

		// ctx.beginPath();
		// ctx.arc(body.location.getX(), body.location.getY(), 3, 0, Math.PI / 2, true);
		// ctx.closePath();
		// ctx.fillStyle = "blue";
		// ctx.fill();


		// Rotate the test points to the Body's angle
		const rotatedPoints = points.map(point => {
			const p = point.substract(body.location);
			p.rotateBy(-body.angle);
			p.addTo(body.location);
			return p;
		});

		// Debug draw
		// rotatedPoints.forEach(p => {
		//   ctx.beginPath();
		//   ctx.arc(p.getX(), p.getY(), 3, 0, Math.PI / 2, true);
		//   ctx.closePath();
		//   ctx.fillStyle = "green";
		//   ctx.fill();
		// })


		for (let i=0, len=rotatedPoints.length; i<len; i++) {
			if (Intersections.pointInRectangle(rotatedPoints[i], rect)) {
				return true;
			}
		}
		return false;
	}

}

module.exports = Collisioner;
