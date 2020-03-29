const SpatialPartitioner = require("./SpatialPartitioner");

class LocalInteraction extends SpatialPartitioner {

  run() { }

  resolve(cb) {

    // A. Iterate cells
    for (let c=0, len=this.cells.length; c<len; c++) {
      const currentCell = this.cells[c];

      // Find neighbor cells
      const neighborCells = this.getNeighborCells(currentCell);

      // Iterate local bodies
      for (let i=0,len=currentCell.bodies.length; i<len; i++) {
        const body = currentCell.bodies[i];

        // Resolve local-local pairs
        for (let x=0,len=currentCell.bodies.length; x<len; x++) {
          const local = currentCell.bodies[x];
          if (body.uuid === local.uuid) continue;
          cb(body, local);
        }

        // Resolve local-beighbor pairs
        for (let y=0,len=neighborCells.length; y<len; y++) {
          const currentNeighbor = neighborCells[y];
          for (let z=0,len=currentNeighbor.bodies.length; z<len; z++) {
            const neighbor = currentNeighbor.bodies[z];
            cb(body, neighbor);
          }
        }
      }
    }
	}


  // resolve(cb) {
  //   for (let c=0, len=this.cells.length; c<len; c++) {
  //     const cell = this.cells[c];
  //     for (let i=0,len=cell.bodies.length; i<len; i++) {
  //       const bodyA = cell.bodies[i];
  //       for (let x=0,len=cell.bodies.length; x<len; x++) {
  //         const bodyB = cell.bodies[x];
  //         if (bodyA.uuid === bodyB.uuid) continue;
  //         cb(bodyA, bodyB);
  //       }
  //     }
  //   }
	// }

}

module.exports = LocalInteraction;
