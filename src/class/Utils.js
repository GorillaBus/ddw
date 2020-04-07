class Utils {

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
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
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

  mapRange(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
  }

  /**
  * Generates a random angle between -pi and +pi.
  * @method
  * @returns {Float} - An angle in radians.
  */
  randomAngle() {
    return this.randomRange(-Math.PI, Math.PI);
  }

  componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }

  hexToRgb(hex) {
   var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
   return result ? {
     r: parseInt(result[1], 16),
     g: parseInt(result[2], 16),
     b: parseInt(result[3], 16)
   } : null;
 }

 randomColor() {
   return "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
 }

}

const instance = new Utils();

module.exports = instance;
