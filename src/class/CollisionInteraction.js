const BroadPhaseTester = require('./BroadPhaseTester');

class CollisionInteraction extends BroadPhaseTester {

/**
 * Performs a broad-phase collision detection between bodies that share the same partitioning cells.
 * @extends BroadPhaseTester
 * @summary View file: {@link https://github.com/GorillaBus/ddw/blob/master/src/class/BodyManager.js https://github.com/GorillaBus/ddw/blob/master/src/class/CollisionInteraction.js}.
 * @constructor
 * @param {Object} settings - Json object with construction options.
 * @param {Intersector} settings.intersector - An intersector object.
 * @param {CollisionResolver} settings.collisionResolver - A collisionResolver object.
 */
  constructor(settings) {
    super(settings);
    this.intersector = settings.intersector;
	  this.collisionResolver = settings.collisionResolver;
  }

  /**
  * Iterates through all partitioning cells and performs a collision test and resolving between all their registered bodies.
  * @method
  */
  run() {
    for (let c=0, len=this.cells.length; c<len; c++) {
      const cell = this.cells[c];
      for (let i=0,len=cell.bodies.length; i<len; i++) {
        const bodyA = cell.bodies[i];
        for (let x=0,len=cell.bodies.length; x<len; x++) {
          const bodyB = cell.bodies[x];
          if (bodyA.uuid === bodyB.uuid) continue;
          this.collision(bodyA, bodyB);
        }
      }
    }
  }

  /**
  * Tests the two given bodies for intersection and performs collision resolution.
  * @method
  * @param {Body} bodyA - Test body A
  * @param {Body} bodyB - Test body B
  */
  collision(bodyA, bodyB) {
    const intersection = this.intersector.circleCircle(bodyA.worldTransform.boundingBox, bodyB.worldTransform.boundingBox);
    if (intersection) {
      this.collisionResolver.elastic(bodyA, bodyB, intersection);
    }
  }
}

module.exports = CollisionInteraction;
