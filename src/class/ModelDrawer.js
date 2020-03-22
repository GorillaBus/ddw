class ModelDrawer {

	drawModel(model, ctx) {
    const points = model.getPoints();
		ctx.beginPath();
		for (let i = 0, len=points.length; i<len; i++) {
			const a = points[i];
			const b = i === len - 1 ? points[0] : points[i + 1];
			if (i === 0) {
				ctx.moveTo(a[0], a[1]);
			}
			ctx.lineTo(b[0], b[1]);
		}
		ctx.closePath();
		if (model.strokeColor) {
			ctx.strokeStyle = model.strokeColor;
			ctx.stroke();
		}
		if (model.fillColor) {
			ctx.fillStyle = model.fillColor;
			ctx.fill();
		}
	}

}

module.exports = ModelDrawer;
