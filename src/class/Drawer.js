
class Drawer {

/**
 * Draws shape objects in a given canvas 2D rendering context.
 * @summary View file: {@link https://github.com/GorillaBus/ddw/blob/master/src/class/BodyManager.js https://github.com/GorillaBus/ddw/blob/master/src/class/Drawer.js}.
 * @constructor
 * @param {Object} settings - Json object with construction options.
 * @param {CanvasRenderingContext2D} settings.ctx - A canvas 2D rendering context.
 */
	constructor(settings) {
		this.ctx = settings.ctx;
	}

	/**
	* Draws every shape in the given array.
	* @method
	* @param {Array} shapes - An array of shape objects.
	*/
	draw(shapes) {
		shapes.forEach(shape => {
			if (shape.visible) {
				this.drawPolygon(shape);
			}
		});
	}

	/**
	* Iterates through the points that define a shape (polygon) drawing lines.
	* @method
	* @param {Shape} shape - A shape object.
	*/
	drawPolygon(shape) {
		const ptsLength = shape.points.length;

		this.ctx.beginPath();
		for (let i = 0; i<ptsLength; i++) {
			const a = shape.points[i];
			const b = i === ptsLength - 1 ? shape.points[0] : shape.points[i + 1];
			if (i === 0) {
				this.ctx.moveTo(a.getX(), a.getY());
			}
			this.ctx.lineTo(b.getX(), b.getY());
		}
		this.ctx.closePath();
		if (shape.strokeColor) {
			this.ctx.strokeStyle = shape.strokeColor;
			this.ctx.stroke();
		}
		if (shape.fillColor) {
			this.ctx.fillStyle = shape.fillColor;
			this.ctx.fill();
		}
	}
}

module.exports = Drawer;
