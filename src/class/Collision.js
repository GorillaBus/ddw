const SpatialInteraction = require("./SpatialInteraction");
const Physics = require("./Physics");
const Geometry = require("./Geometry");

class Collision extends SpatialInteraction {

  constructor(settings) {
    super(settings);
    this.physics = Physics;
    this.geometry = Geometry;
    this.intersector = settings.intersector;
    this.resolver = settings.resolver;
    this.collision = this.collision.bind(this);
  }

  run() {
    this.resolve(this.collision);
  }

  collision(bodyA, bodyB) {
    const intersection = this.geometry.circleCircleIntersection(bodyA.world, bodyB.world);
    if (intersection) {
      this.physics.elasticCollision(bodyA, bodyB, intersection);
    }
  }

}

module.exports = Collision;
