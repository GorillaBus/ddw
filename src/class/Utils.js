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

  /**
  * Generates a random angle between -pi and +pi.
  * @method
  * @returns {Float} - An angle in radians.
  */
  randomAngle() {
    return this.randomRange(-Math.PI, Math.PI);
  }

}

const instance = new Utils();

module.exports = instance;
