const BroadPhaseTester = require('./BroadPhaseTester');

class CollisionInteraction extends BroadPhaseTester {

  constructor(settings) {
    super(settings);
    this.intersector = settings.intersector;
	this.collisionResolver = settings.collisionResolver;
  }

  run() {
    // Iterate cells
	for (let c=0, len=this.cells.length; c<len; c++) {
		const cell = this.cells[c];

		// Iterate bodies (1)
		for (let i=0,len=cell.bodies.length; i<len; i++) {
			const bodyA = cell.bodies[i];

			// Iterate bodies (2)
			for (let x=0,len=cell.bodies.length; x<len; x++) {
				const bodyB = cell.bodies[x];
				if (bodyA.uuid === bodyB.uuid) continue;

      this.collision(bodyA, bodyB);
			}
		}
	}
  }

  collision(bodyA, bodyB) {
    const intersection = this.intersector.circleCircle(bodyA.worldTransform.boundingBox, bodyB.worldTransform.boundingBox);
    if (intersection) {
      this.collisionResolver.elastic(bodyA, bodyB, intersection);
    }
  }

}

module.exports = CollisionInteraction;
