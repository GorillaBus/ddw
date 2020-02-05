const Utils = require('./Utils');
const Vector = require('./Vector');
const Model = require('./Model');

class Body {

  constructor(settings) {
    settings = settings || {};
    settings.x = settings.x || 0;
    settings.y = settings.y || 0;

    this.scale = settings.scale || 1;
    this.angle = settings.angle || 0;
    this.speed = settings.speed || 0;
    this.mass = settings.mass || 1;

    this.acceleration = new Vector({ x: 0, y: 0 });
    this.velocity = new Vector({ length: this.speed, angle: this.angle });
    this.location = new Vector({ x: settings.x, y: settings.y });

    // Dimensions
    this.width = settings.width || 0;
    this.height = settings.height || 0;
    this.radius = settings.radius || 0;

    this.uuid = Utils.uniqueID();
    this.visible = settings.visible === false ? false:true;

    // Last world transform
    this.worldTransform = {};

    // Last view transform
    this.viewTransform = {};

    // Model
    this.model = new Model(settings.modelData);
    this.transformToWorld();
  }

  update() {
    this.velocity.addTo(this.acceleration);
    this.location.addTo(this.velocity);
    this.acceleration.multiplyBy(0);
  }

  getWidth() {
    return this.worldTransform.width;
  }

  getHeight() {
    return this.worldTransform.height;
  }

  getRadius() {
    return this.worldTransform.radius;
  }

  setPosition(vec) {
    this.location = vec;
  }

  applyForce(force) {
    let f = force.divide(this.mass);
    this.acceleration.addTo(f);
  }

  resetVelocity() {
    this.velocity.multiplyBy(0);
  }

  transformToWorld() {
    this.worldTransform = this.model.transform(this.angle, this.scale, this.location);
  }

  transformToView(view) {
    this.viewTransform = (this.uuid === view.attachedTo.uuid) ?
      this.model.transformViewpoint(view, this.angle, this.scale) : this.worldTransform.transformView(view, true);
  }

  gravitateTo(target, gravityFactor) {
    const diff = target.location.substract(this.location);
    const distance = diff.getLength();
    const force = this.mass * target.mass / (distance * distance);
    diff.normalize();
    diff.multiplyBy(force);
    this.velocity.addTo(diff);
    return force;
  }

}

module.exports = Body;
