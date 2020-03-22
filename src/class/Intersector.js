class Intersector {

	getBoundingRectangle(model) {
		return {
			x: model.bounds.xMin,
			y: model.bounds.yMin,
			width: model.width,
			height: model.height
		};
	}

	getBoundingCircle(model) {
		return {
			x: model.center[0],
			y: model.center[1],
			radius: model.radius
		};
	}

  rangeIntersect(min0, max0, min1, max1) {
    return  Math.max(min0, max0) >= Math.min(min1, max1) &&
      Math.min(min0, max0) <= Math.max(min1, max1);
  }

  rectangleInRectangle(rectangleModel1, rectangleModel2) {
		const r1 = this.getBoundingRectangle(rectangleModel1);
		const r2 = this.getBoundingRectangle(rectangleModel2);
    return this.rangeIntersect(r1.x, r1.x + r1.width, r2.x, r2.x + r2.width) &&
      this.rangeIntersect(r1.y, r1.y + r1.height, r2.y, r2.y + r2.height);
  }

	circleInRectangle(circleModel, rectangleModel) {
		const c = this.getBoundingCircle(circleModel);
		const r = this.getBoundingRectangle(rectangleModel);
		const distX = Math.abs(c.x - r.x - r.width / 2);
		const distY = Math.abs(c.y - r.y - r.height / 2);
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

	circleCircle(circleModel1, circleModel2) {
		const c1 = this.getBoundingCircle(circleModel1);
		const c2 = this.getBoundingCircle(circleModel2);
		// Get the Distance vector
		const xDist = c1.x - c2.x;
		const yDist = c1.y - c2.y;
		// We'll save a Math.sqrt() to verify distances like this:
		const distSquared = (xDist * xDist) + (yDist * yDist);
		const radiusSquared = (c1.radius + c2.radius) * (c1.radius + c2.radius);
		// Collision check
		if (distSquared < radiusSquared) {
			return { x: xDist, y: yDist, dist_squared: distSquared };
		}
		return false;
	}

}

module.exports = new Intersector();
