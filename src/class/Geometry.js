class Geometry {

  rectangleRectangleIntersection(r1, r2) {
    return this.rangeIntersect(r1.bounds.xMin, r1.bounds.xMin + r1.width, r2.bounds.xMin, r2.bounds.xMin + r2.width) &&
      this.rangeIntersect(r1.bounds.yMin, r1.bounds.yMin + r1.height, r2.bounds.yMin, r2.bounds.yMin + r2.height);
  }

	circleRectangleIntersection(c, r) {
		const distX = Math.abs(c.center[0] - r.bounds.xMin - r.width / 2);
		const distY = Math.abs(c.center[1] - r.bounds.yMin - r.height / 2);
		// Out of range
		if (distX > (r.width / 2 + c.radius) || distY > (r.height / 2 + c.radius)) {
			return false;
		}
		// In range
		if (distX <= (r.width / 2) || distY <= (r.height / 2)) {
			return true;
		}
		// Rectangle corners
		const dx = distX - r.width / 2;
		const dy = distY - r.height / 2;
		return (dx * dx + dy * dy <= (c.radius * c.radius));
	}

	circleCircleIntersection(c1, c2) {
		const xDist = c1.center[0] - c2.center[0];
		const yDist = c1.center[1] - c2.center[1];
		const distSquared = (xDist * xDist) + (yDist * yDist);
		const radiusSquared = (c1.radius + c2.radius) * (c1.radius + c2.radius);
		if (distSquared < radiusSquared) {
			return { x: xDist, y: yDist, dist_squared: distSquared };
		}
		return false;
	}

  rangeIntersect(min0, max0, min1, max1) {
    return  Math.max(min0, max0) >= Math.min(min1, max1) &&
      Math.min(min0, max0) <= Math.max(min1, max1);
  }

}

module.exports = new Geometry();
