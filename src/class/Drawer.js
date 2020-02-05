
class Drawer {
	constructor(settings) {
		this.ctx = settings.ctx;
	}

	draw(shapes) {
		shapes.forEach(shape => {
			if (shape.visible) {
				this.drawPolygon(shape);
			}
		});
	}

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
