class Vector {

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

  setX(value) {
    this.x = value;
  }

  getX(value) {
    return this.x;
  }

  setY(value) {
    this.y = value;
  }

  getY(value) {
    return this.y;
  }

  setAngle(angle) {
    let length = this.getLength();
    this.x = Math.cos(angle) * length;
    this.y = Math.sin(angle) * length;
  }

  getAngle() {
    return Math.atan2(this.getY(), this.getX());
  }

  setLength(length) {
    let angle = this.getAngle();
    this.x = Math.cos(angle) * length;
    this.y = Math.sin(angle) * length;
  }

  getLength() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  hasLength() {
    return this.x !== 0 || this.y !== 0;
  }

  rotateBy(angle) {
    const x = this.getX();
    const y = this.getY();
    this.x = x * Math.cos(angle) - y * Math.sin(angle);
    this.y = x * Math.sin(angle) + y * Math.cos(angle);
  }

  add(vector) {
    return new Vector({ x: this.x + vector.getX(), y: this.y + vector.getY() });
  }

  substract(vector) {
    return new Vector({ x: this.x - vector.getX(), y: this.y - vector.getY() });
  }

  multiply(value) {
    return new Vector({ x: this.x * value, y: this.y * value });
  }

  divide(value) {
    return new Vector({ x: this.x / value, y: this.y / value });
  }

  addTo(vector) {
    this.x += vector.getX();
    this.y += vector.getY();
  }

  substractFrom(vector) {
    this.x -= vector.getX();
    this.y -= vector.getY();
  }

  multiplyBy(value) {
    this.x *= value;
    this.y *= value;
  }

  divideBy(value) {
    this.x /= value;
    this.y /= value;
  }

  /*
      < 0  =>  Is behind
      > 0  =>  Is in front
      = 0  =>  Is at left/right
  */
  dot(v) {
    return this.x*v.x + this.y*v.y;
  }

  cross(v) {
    return (this.x*v.y) - (this.y*v.x);
  }

  perpDot(v) {
    const v3 = this.substract(v);
    const t = v3.cross(v) / this.cross(v);
    return new Vector({
      x: this.getX() + v.getX() * t,
      y: this.getY() + v.getY() * t
    });
  }

  project(v) {
    const d = v.dot(v);
    if (d > 0) {
      const dp = this.dot(v);
      const factor = dp / d;
      const rx = v.copy();
      rx.multiplyBy(factor);
      return rx;
    }
    return new Vector();
  }

  angleBetween(v) {
    //return Math.acos( (v1.x * v2.x + v1.y * v2.y) / ( Math.sqrt(v1.x*v1.x + v1.y*v1.y) * Math.sqrt(v2.x*v2.x + v2.y*v2.y) ) )
    let v1 = this.copy();
    let v2 = v.copy();

    v1.normalize();
    v2.normalize();
    let dot = v1.dot(v2);

    let theta = Math.acos(dot);

    if (isNaN(theta)) {
      console.warn("Theta is 'NaN' on Vector.angleBetween()")
    }

    return theta;
  }

  angleDirection(v) {
    let crossProduct = this.cross(v);
    if (crossProduct > 0.0) {
      return 1;
    } else if (crossProduct < 0.0) {
      return -1;
    } else {
      return 0;
    }
  }

  angleDifference(v) {
    let theta = this.angleBetween(v);
    let dir = this.angleDirection(v);
    return theta * dir;
  }

  copy() {
    return new Vector({
      x: this.getX(),
      y: this.getY()
    });
  }

  normalize() {
    var length = this.getLength();
    if (length != 0) {
      this.divideBy(length);
    }
  }

  dist(p) {
    let d = p.substract(this);
    return d.getLength();
  }

  limit(n) {
    if (this.getLength() > n) {
      this.setLength(n);
    }
  }

  reset() {
    this.x = 0;
    this.y = 0;
  }
};

module.exports = Vector;
