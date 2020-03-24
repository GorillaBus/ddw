const SpatialPartitioner = require("./SpatialPartitioner");

class LocalInteraction extends SpatialPartitioner {

  run() { }

  resolve(cb) {
    for (let c=0, len=this.cells.length; c<len; c++) {
      const cell = this.cells[c];
      for (let i=0,len=cell.bodies.length; i<len; i++) {
        const bodyA = cell.bodies[i];
        for (let x=0,len=cell.bodies.length; x<len; x++) {
          const bodyB = cell.bodies[x];
          if (bodyA.uuid === bodyB.uuid) continue;
          cb(bodyA, bodyB);
        }
      }
    }
	}

}

module.exports = LocalInteraction;
