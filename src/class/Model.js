class Model {

	constructor(settings) {
    this.points = settings.points || [];
		this.strokeColor = settings.strokeColor || "#94ec5d";
    this.fillColor = settings.fillColor || null;
		this.bounds = this.getBounds();
		this.center = this.getCenter();
		this.width = this.bounds.xMax - this.bounds.xMin;
		this.height = this.bounds.yMax - this.bounds.yMin;
		this.radius = Math.max(this.width, this.height) / 2;
	}

  getPoints() {
    return this.points;
  }

	getBounds() {
		const xs = [];
		const ys = [];
		for (let i=0,len=this.points.length; i<len; i++) {
			const point = this.points[i];
			xs.push(point[0]);
			ys.push(point[1]);
		}
		return {
			xMin: Math.min.apply(null, xs),
			xMax: Math.max.apply(null, xs),
			yMin: Math.min.apply(null, ys),
			yMax: Math.max.apply(null, ys)
		};
	}

	getCenter() {
		return [
			(this.bounds.xMin + this.bounds.xMax) / 2,
			(this.bounds.yMin + this.bounds.yMax) / 2
		];
	}

  transform(r, s, t) {
		t = t || [0, 0];
    const transformed = [];
		for (let j=0,len=this.points.length; j<len; j++) {
      let p = this.points[j];
			p = this.rotatePoint(p, r);
			p = this.scalePoint(p, s);
		  p = this.translatePoint(p, t);
			transformed.push(p);
		}
    return new Model({
      points: transformed,
      strokeColor: this.strokeColor,
      fillColor: this.fillColor
    });
	}

  rotatePoint(point, angle) {
    return [
      point[0] * Math.cos(angle) - point[1] * Math.sin(angle),
      point[0] * Math.sin(angle) + point[1] * Math.cos(angle)
    ];
  }

  scalePoint(point, scale) {
    return [
      point[0] * scale,
      point[1] * scale
    ]
  }

  translatePoint(point, position) {
    return [
      point[0] + position[0],
      point[1] + position[1]
    ]
  }

}

module.exports = Model;
