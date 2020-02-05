const Utils = require('./Utils');

class Intersector {

	pointsInsideRectangle(points, rect) {
		for (let i=0, len=points.length; i<len; i++) {
			const p = points[i];
			if (this.pointInRectangle(p, rect)) {
				return true;
			}
		}
		return false;
	}

	pointInRectangle(p, rect) {
		return Utils.inRange(p.getX(), rect.x, rect.x + rect.width) &&
		Utils.inRange(p.getY(), rect.y, rect.y + rect.height);
	}

	circleInRectangle(circle, rect) {
		const distX = Math.abs(circle.x - rect.x - rect.width / 2);
		const distY = Math.abs(circle.y - rect.y - rect.height / 2);

		// Out of range
		if (distX > (rect.width / 2 + circle.radius) || distY > (rect.height / 2 + circle.radius)) {
			return false;
		}

		// In range
		if (distX <= (rect.width / 2) || distY <= (rect.height / 2)) {
			return true;
		}

		// Rectangle corners
		const dx = distX - rect.width / 2;
		const dy = distY - rect.height / 2;
		return (dx * dx + dy * dy <= (circle.radius * circle.radius));
	}

	pointInRectangleB(p, rect) {
		const a = points[0];
		const b = points[1];
		const d = points[2];
		const ex = b.x - a.x;
		const ey = b.y - a.y;
		const fx = d.x - a.x;
		const fy = d.y - a.y;
		if ((p.x - a.x) * ex + (p.y - a.y) * ey < 0.0) return false;
		if ((p.x - b.x) * ex + (p.y - b.y) * ey > 0.0) return false;
		if ((p.x - a.x) * fx + (p.y - a.y) * fy < 0.0) return false;
		if ((p.x - d.x) * fx + (p.y - d.y) * fy > 0.0) return false;
		return true;
	}
}

module.exports = Intersector;
