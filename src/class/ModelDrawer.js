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

	drawBoundingRectangle(model, ctx) {
		ctx.beginPath();
    ctx.strokeStyle = "yellow";
    ctx.strokeRect(model.bounds.xMin, model.bounds.yMin, model.width, model.height);
    ctx.closePath();
	}

	drawBoundingCircle(model, ctx) {
		ctx.beginPath();
    ctx.strokeStyle = "yellow";
    ctx.arc(model.center[0], model.center[1], model.radius, 0, 2 * Math.PI);
		ctx.stroke();
		ctx.closePath();
	}

}

module.exports = ModelDrawer;
