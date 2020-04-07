const Vector = require("./Vector");

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

	drawInnerShadow(model, lightSource, ctx, shadowScale, shadowDisplacement, shadowSpread) {
		if (model.radius < 1) { return; }

		shadowScale = shadowScale || 6;
		shadowDisplacement = shadowDisplacement || 0.92;
		shadowSpread = shadowSpread || 0.94;

	  const shadowModelRadius = model.radius * shadowScale;
	  const shadowVector = new Vector({
	    x: model.center[0] - lightSource.center[0],
	    y: model.center[1] - lightSource.center[1]
	  });

	  shadowVector.normalize();
	  shadowVector.multiplyBy(shadowModelRadius * shadowDisplacement);
		shadowVector.x += model.center[0];
	  shadowVector.y += model.center[1];

	  ctx.save();

	  // Create clipping path
	  let region = new Path2D();
	  region.arc(model.center[0], model.center[1], model.radius + 1, 0, Math.PI*2, true);
	  ctx.clip(region);

	  // Shadow model
	  const gradient = ctx.createRadialGradient(shadowVector.getX(), shadowVector.getY(), shadowModelRadius * shadowSpread, shadowVector.getX(), shadowVector.getY(), shadowModelRadius);
	  gradient.addColorStop(0, "rgba(0, 0, 0, 1)");
	  gradient.addColorStop(1, "rgba(0, 0, 0, 0.001)");

	  ctx.beginPath();
	  ctx.fillStyle = gradient;
	  ctx.arc(shadowVector.getX(), shadowVector.getY(), shadowModelRadius, 0, Math.PI * 2, true);
	  ctx.fill();
	  ctx.closePath();

	  ctx.restore();
	}

}

module.exports = ModelDrawer;
