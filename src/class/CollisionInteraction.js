const LocalInteraction = require("./LocalInteraction");

class CollisionInteraction extends LocalInteraction {

  constructor(settings) {
    super(settings);
    this.intersector = settings.intersector;
    this.resolver = settings.resolver;

    this.collision = this.collision.bind(this);
  }

  run() {
    this.resolve(this.collision);
  }

  collision(bodyA, bodyB) {
    const intersection = this.intersector.circleCircle(bodyA.world, bodyB.world);
    if (intersection) {
      this.resolver.elastic(bodyA, bodyB, intersection);
    }
  }

}

module.exports = CollisionInteraction;
