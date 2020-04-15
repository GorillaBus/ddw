/**
 * A singleton class that provides a methods for generating sets of points that describe complex polygonal shapes.
 * @summary View file: {@link https://github.com/GorillaBus/ddw/blob/master/src/class/BodyManager.js https://github.com/GorillaBus/ddw/blob/master/src/class/PolygonGenerator.js}.
 * @class
 */

class PolygonGenerator {

  /**
	* Generates a set of points for a circular shape.
	* @method
  * @param {Object} settings - Json object that specify different aspects of the desired shape.
	* @param {Int} [settings.divs=32] - Number of identically sepparated points around the circle's center.
	* @param {Float} [settings.radius=1] - Radius of the circle.
	* @returns {Array} An array of points that describe the shape. 
	*/
  circle(settings) {
    const divs = settings.divs || 32;
    const radius = settings.radius || 1;
    const angleFraction = (Math.PI * 2) / settings.divs;
    const points = [];
    for (let i=0; i<divs; i++) {
      const point = [
        Math.cos(angleFraction * i + 1) * radius,
        Math.sin(angleFraction * i + 1) * radius,
      ];
      points.push(point);
    }
    return points;
  }

}

module.exports = new PolygonGenerator();
