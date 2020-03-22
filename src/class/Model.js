const Vector = require('./Vector');

class Model {

	constructor(settings) {
    this.points = settings.points || [];
		this.strokeColor = settings.strokeColor || "#94ec5d";
    this.fillColor = settings.fillColor || null;
	}

  getPoints() {
    return this.points;
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
