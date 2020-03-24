const Model = require("./Model");

class PolygonGenerator {

  circle(settings) {
    const divs = settings.divs || 32;
    const fillColor = settings.fillColor || '#FFFFFF';
    const strokeColor = settings.strokeColor || null;
    const radius = settings.radius || 1;
    const angleFraction = (Math.PI * 2) / settings.divs;
    const points = [];
    for (let i=0; i<divs; i++) {
      const point = [
        Math.cos(angleFraction * i+1) * radius,
        Math.sin(angleFraction * i + 1) * radius,
      ];
      points.push(point);
    }
    return new Model({
      fillColor,
      fillColor,
      points
    });
  }

}

const itc = new PolygonGenerator();

module.exports = itc;
