/**
* A singleton class that provides general utility methods to work with math, random generators and more.
* @class
* @summary View file: {@link https://github.com/GorillaBus/ddw/blob/master/src/class/BodyManager.js https://github.com/GorillaBus/ddw/blob/master/src/class/Utils.js}.
*/
class Utils {

  /**
  * Montecarlo numbers generator.
  * @method
  * @returns {Foat} A numeric value generated by the montecarlo function.
  */
  montecarlo() {
    while(true) {
      let r1 = Math.random();
      let p = r1;
      let r2 = Math.random();
      if (r2 < p) {
        return r1;
      }
    }
  }

  /**
  * Linear interpolation between min and max value.
  * @method
  * @param {Float} t - The value between min and min to interpolate.
  * @param {Float} min - Minimum value for interpolation.
  * @param {Float} max - Maximum value for interpolation.
  * @returns {Float} - The interpolated value.
  */
  lerp(t, min, max) {
    return (max - min) * t + min;
  }

  /**
  * Generates a random angle between -pi and +pi.
  * @method
  * @returns {Float} - An angle in radians.
  */
  randomAngle() {
    return this.randomRange(-Math.PI, Math.PI);
  }

  /**
  * Maps a given value withi the range {low1, high1} into a value between {low2, high2}
  * @method
  * @param {Float} value - The value to be mapped.
  * @param {Float} low1 - Minimum range value to which 'value' belongs.
  * @param {Float} high1 - Maximum range value to which 'value' belongs.
  * @param {Float} low2 - Minimum value for the required range.
  * @param {Float} high2 - Maximum value for the required range.
  * @returns {Float} - The mapped value.
  */
  mapRange(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
  }

  /**
  * Tells wether a value is inside a given range or not.
  * @method
  * @param {Float} value - The value to test.
  * @param {Float} min - Minimum value of the range.
  * @param {Float} high1 - Maximum value of the range.
  * @returns {Boolean} - True if the value is within the range, otherwise false.
  */
  inRange(value, min, max) {
    return value >= Math.min(min, max) && value <= Math.max(min, max);
  }

  /**
  * Tells wether two ranges of values are intersecting or not.
  * @method
  * @param {Float} min0 - Starting value for range A.
  * @param {Float} max0 - Ending value for range A.
  * @param {Float} min1 - Starting value for range B.
  * @param {Float} max1 - Ending value for range B.
  * @returns {Boolean} - True when both ranges are intersecting, false otherwise.
  */
  rangeIntersect(min0, max0, min1, max1) {
    return  Math.max(min0, max0) >= Math.min(min1, max1) &&
    Math.min(min0, max0) <= Math.max(min1, max1);
  }

  /**
  * Returns a random value between the defined range.
  * @method
  * @param {Float} min - Minimum value of the range.
  * @param {Float} max - Maximum value of the range.
  * @returns {Float} - A random value between min and max.
  */
  randomRange(min, max) {
    return min + Math.random() * (max - min);
  }

  /**
  * Generates a random hex color code.
  * @method
  * @returns {Float} - A random hex color code.
  */
  randomColor() {
    return "#000000".replace(/0/g, function () { return (~~(Math.random() * 16)).toString(16); });
  }

  /**
  * Will return a value constrained between a minimum and a maximum limits.
  * @method
  * @param {Float} value - The value to constrain.
  * @param {Float} min - Minimum permited value.
  * @param {Float} max - Maximum permited value.
  * @returns {Float} - A value constrained between min and max.
  */
  constrain(value,min,max) {
    return value>max?max:value<min?min:value;
  }

  /**
  * Generates a unique id.
  * @method
  * @returns {String} - A unique id.
  */
  uniqueID() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
  }

  /**
  * Given an angle in radians it will convert it to degrees.
  * @method
  * @param {Float} angle - An angle in radians.
  * @returns {Float} - An angle in degrees.
  */
  rad2deg(angle) {
    return angle * 180 / Math.PI;
  }

  /**
  * Given an angle in degrees it will convert it to radians.
  * @method
  * @param {Float} angle - An angle in radians.
  * @returns {Float} - An angle in degrees.
  */
  deg2rad(d) {
    return d * Math.PI / 180;
  }

  /**
  * Converts an hexadecimal color code to RGB.
  * @method
  * @param {String} hex - A string representing the hexadecimal color code.
  * @returns {Object} - A json object with red, green and blue values.
  */
  hexToRGB(hex) {
    let color = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return color ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
  }
}

const instance = new Utils();

module.exports = instance;
