class Vector {

  /**
  * A 2D vector class that provides a wide range of vector operations.
  * @summary View file: {@link https://github.com/GorillaBus/ddw/blob/master/src/class/BodyManager.js https://github.com/GorillaBus/ddw/blob/master/src/class/Shape.js}.
  * @constructor
  * @param {Object} settings - Json object with construction options.
  * @param {Float} [settings.x=0] - Initial X vector component.
  * @param {Float} [settings.y=0] - Initial Y vector component.
  * @param {Float} [settings.length=0] - Initial vector magnitude or length.
  * @param {Float} [settings.angle=0] - Initial vector angle in radians.
  */
  constructor(settings) {
    settings = settings || {};
    settings.x = settings.x || 0;
    settings.y = settings.y || 0;
    settings.length = settings.length || 0;
    settings.angle = settings.angle || 0;
    this.x = settings.x;
    this.y = settings.y;
    if (settings.length) {
      this.setLength(settings.length);
    }
    if (settings.angle) {
      this.setAngle(settings.angle);
    }
  }

  /**
  * Sets the X component of the vector.
  * @method
  * @param {Float} magnitude - Vector magnitude over the X axis.
  */
  setX(magnitude) {
    this.x = magnitude;
  }

  /**
  * Gets the X component of the vector.
  * @method
  * @returns {Float} Vector magnitude over the X axis.
  */
  getX() {
    return this.x;
  }

  /**
  * Sets the Y component of the vector.
  * @method
  * @param {Float} magnitude - Vector magnitude over the Y axis.
  */
  setY(magnitude) {
    this.y = magnitude;
  }

  /**
  * Gets the Y component of the vector.
  * @method
  * @returns {Float} Vector magnitude over the Y axis.
  */
  getY() {
    return this.y;
  }

  /**
  * Sets the vector angle.
  * @method
  * @param {Float} angle - Angle in radians.
  */
  setAngle(angle) {
    let length = this.getLength();
    this.x = Math.cos(angle) * length;
    this.y = Math.sin(angle) * length;
  }

  /**
  * Gets the current vector's angle.
  * @method
  * @returns {Float} The vector's angle in radians.
  */
  getAngle() {
    return Math.atan2(this.getY(), this.getX());
  }

  /**
  * Sets the magnitude of the vector on it's current direction.
  * @method
  * @param {Float} length - The desired length for the vector.
  */
  setLength(length) {
    let angle = this.getAngle();
    this.x = Math.cos(angle) * length;
    this.y = Math.sin(angle) * length;
  }

  /**
  * Gets the current length of the vector.
  * @method
  * @returns {Float} The current vector's length.
  */
  getLength() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  /**
  * Tells if the vector has a length different than 0.
  * @method
  * @returns {Boolean} True when the vector's length is different than 0, false either.
  */
  hasLength() {
    return this.x !== 0 || this.y !== 0;
  }

  /**
  * Rotates the vector by a given angle in radians.
  * @method
  * @param {Float} angle - The rotation angle in radians.
  */
  rotateBy(angle) {
    const x = this.getX();
    const y = this.getY();
    this.x = x * Math.cos(angle) - y * Math.sin(angle);
    this.y = x * Math.sin(angle) + y * Math.cos(angle);
  }

  /**
  * Adds a given vector to the current vector, returning a new instance.
  * @method
  * @param {Vector} vector - A vector object.
  * @returns {Vector} The resulting vector object.
  */
  add(vector) {
    return new Vector({ x: this.x + vector.getX(), y: this.y + vector.getY() });
  }

  /**
  * Substracts a vector to the current vector, returning a new instance.
  * @method
  * @param {Vector} vector - A vector object.
  * @returns {Vector} The resulting vector object.
  */
  substract(vector) {
    return new Vector({ x: this.x - vector.getX(), y: this.y - vector.getY() });
  }

  /**
  * Muliplies the current vector by a given vector
  * @method
  * @param {Vector} vector - A vector object.
  * @returns {Vector} The resulting vector object.
  */
  multiply(value) {
    return new Vector({ x: this.x * value, y: this.y * value });
  }

  /**
  * Divides the current vector by a given vector.
  * @method
  * @param {Vector} vector - A vector object.
  * @returns {Vector} The resulting vector object.
  */
  divide(value) {
    return new Vector({ x: this.x / value, y: this.y / value });
  }

  /**
  * Adds a given vector to the current vector instance.
  * @method
  * @param {Vector} vector - A vector object.
  */
  addTo(vector) {
    this.x += vector.getX();
    this.y += vector.getY();
  }

  /**
  * Substracts a given vector from the current vector instance.
  * @method
  * @param {Vector} vector - A vector object.
  */
  substractFrom(vector) {
    this.x -= vector.getX();
    this.y -= vector.getY();
  }

  /**
  * Multiplies the current vector instance by a given vector.
  * @method
  * @param {Vector} vector - A vector object.
  */
  multiplyBy(value) {
    this.x *= value;
    this.y *= value;
  }

  /**
  * Divides the current vector instance by a given vector.
  * @method
  * @param {Vector} vector - A vector object.
  */
  divideBy(value) {
    this.x /= value;
    this.y /= value;
  }

  /**
  * Computes the dot product between the current instance and a given vector. Sometimes used to determine the relative position between the two vectors:<br/>&nbsp;&nbsp;<0 means B is behind<br/> &nbsp;&nbsp;=0 means B is in front<br/> &nbsp;&nbsp;>0 means B is at left/rights used to find the position of vector A with respect to vector B:<br/>
  * @method
  * @param {Vector} vector - A vector object.
  * @returns {Float} The dot product between the two vectors.
  */
  dot(vector) {
    return this.x * vector.x + this.y * vector.y;
  }

  /**
  * Computes the cross product between the current instance and a given vector.
  * @method
  * @param {Vector} vector - A vector object.
  * @returns {Float} The cross product between the two vectors.
  */
  cross(vector) {
    return (this.x * vector.y) - (this.y * vector.x);
  }

  /**
  * Computes the perpendicular dot product (or outer product) between two vectors to find the intersection point between the two given vectors.
  * @method
  * @param {Vector} vector - A vector object.
  * @returns {Vector} A vector object representing the intersection point between the two vectors.
  */
  perpDot(vector) {
    const v3 = this.substract(vector);
    const t = v3.cross(vector) / this.cross(vector);
    return new Vector({
      x: this.getX() + vector.getX() * t,
      y: this.getY() + vector.getY() * t
    });
  }

  /**
  * Computes the perpendicular vector from the defined from the current Vector instance to the given Vector.
  * @method
  * @param {Vector} vector - A vector object.
  * @returns {Array} A an array of Vector objects (left and right)
  */
  perpTo(vector) {
    const fromTarget = this.substract(vector);
    fromTarget.normalize();
    const perpLeft = new ddw.Vector({
      x: fromTarget.getY(),
      y: -fromTarget.getX(),
      length: 1
    });
    const perpRight = new ddw.Vector({
      x: -fromTarget.getY(),
      y: fromTarget.getX(),
      length: 1
    });
    return [ perpLeft, perpRight ];
  }

  /**
  * Computes the vector projection of the current instance along the given vector.
  * @method
  * @param {Vector} vector - A vector object.
  * @returns {Vector} A new vector instance representing the computed projection.
  */
  project(v) {
    const d = vector.dot(vector);
    if (d > 0) {
      const dp = this.dot(vector);
      const factor = dp / d;
      const rx = vector.copy();
      rx.multiplyBy(factor);
      return rx;
    }
    return new Vector();
  }

  /**
  * Computes the angle (in radians) formed between the current instance and a given vector.
  * @method
  * @param {Vector} vector - A vector object.
  * @returns {Float} Angle in radians.
  */
  angleBetween(vector) {
    let v1 = this.copy();
    let v2 = vector.copy();
    v1.normalize();
    v2.normalize();
    let dot = v1.dot(v2);
    let theta = Math.acos(dot);
    if (isNaN(theta)) {
      console.warn("Theta is 'NaN' on Vector.angleBetween()")
    }
    return theta;
  }

  /**
  * Returns the direction of the current vector's with respect to a given vector. The result is interpreted as:<br/>&nbsp;&nbsp;=0 in front<br/>&nbsp;&nbsp;-1 to the right<br/>&nbsp;&nbsp;=1 to the left
  * @method
  * @param {Vector} vector - A vector object.
  * @returns {Int} One integer of [-1, 0, 1] interpreted as "right", "in front", "left".
  */
  angleDirection(vector) {
    let crossProduct = this.cross(vector);
    if (crossProduct > 0.0) {
      return 1;
    } else if (crossProduct < 0.0) {
      return -1;
    } else {
      return 0;
    }
  }

  /**
  * Returns the angular difference betwee the current vector and a given vector
  * @method
  * @param {Vector} vector - A vector object.
  * @returns {Float} Angle in radians.
  */
  angleDifference(vector) {
    let theta = this.angleBetween(vector);
    let dir = this.angleDirection(vector);
    return theta * dir;
  }

  /**
  * Creates a copy of the current instance.
  * @method
  * @returns {Vector} A copy of the current instance.
  */
  copy() {
    return new Vector({
      x: this.getX(),
      y: this.getY()
    });
  }

  /**
  * Normalized the current vector instance converting it's magnitude to a value between 0 and 1.
  * @method
  */
  normalize() {
    var length = this.getLength();
    if (length != 0) {
      this.divideBy(length);
    }
  }

  /**
  * Computes the distance between the current instance and a given vector.
  * @method
  * @param {Vector} vector - A vector object.
  * @returns {Float} The distance between the two vector.
  */
  dist(vector) {
    let d = vector.substract(this);
    return d.getLength();
  }

  /**
  * Truncates the current instance's magnitude by a maximum value.
  * @method
  * @param {Float} max - The maximum magnitud for the vector's length.
  */
  limit(max) {
    if (this.getLength() > max) {
      this.setLength(max);
    }
  }

  /**
  * Resets the current instance's x and y components to 0.
  * @method
  */
  reset() {
    this.x = 0;
    this.y = 0;
  }

};

module.exports = Vector;
