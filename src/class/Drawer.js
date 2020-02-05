
class Drawer {
	constructor(settings) {
		this.ctx = settings.ctx;
	}

	draw(shapes) {
		shapes.forEach(shape => {
			if (shape.visible) {
				this.drawPolygon(shape.points, shape.strokeColor, shape.fillColor);
			}
		});
	}

	drawBoundingBox(shape) {
		this.drawPolygon([shape.boundingBox], "#ffffff");
	}

	drawPolygon(points, strokeColor, fillColor) {
		const ptsLength = points.length;
		this.ctx.beginPath();
		for (let i = 0; i<ptsLength; i++) {
			const a = points[i];
			const b = i === ptsLength - 1 ? points[0] : points[i + 1];
			if (i === 0) {
				this.ctx.moveTo(a.getX(), a.getY());
			}
			this.ctx.lineTo(b.getX(), b.getY());
		}
		this.ctx.closePath();
		if (strokeColor) {
			this.ctx.strokeStyle = strokeColor || null;
			this.ctx.stroke();
		}
		if (fillColor) {
			this.ctx.fillStyle = fillColor || null;
			this.ctx.fill();
		}
	}
}

module.exports = Drawer;
