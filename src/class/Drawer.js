
class Drawer {

	constructor(settings) {
		this.ctx = settings.ctx;
	}

	draw(model) {
    const points = model.getPoints();
		this.ctx.beginPath();
		for (let i = 0, len=points.length; i<len; i++) {
			const a = points[i];
			const b = i === len - 1 ? points[0] : points[i + 1];
			if (i === 0) {
				this.ctx.moveTo(a[0], a[1]);
			}
			this.ctx.lineTo(b[0], b[1]);
		}
		this.ctx.closePath();
		if (model.strokeColor) {
			this.ctx.strokeStyle = model.strokeColor;
			this.ctx.stroke();
		}
		if (model.fillColor) {
			this.ctx.fillStyle = model.fillColor;
			this.ctx.fill();
		}
	}
}

module.exports = Drawer;
