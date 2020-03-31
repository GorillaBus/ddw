const SpatialPartitioner = require("./SpatialPartitioner");

class SpatialInteraction extends SpatialPartitioner {

  run() { }

  resolve(localResolver, neighborResolver) {
    neighborResolver = neighborResolver || localResolver;

    // Iterate cells
    for (let i=0, len=this.cells.length; i<len; i++) {
      const currentCell = this.cells[i];

      // Find neighbor cells
      const neighborCells = this.getNeighborCells(currentCell);

      // Iterate local bodies
      for (let j=0,len=currentCell.bodies.length; j<len; j++) {
        const currentBody = currentCell.bodies[j];

        // Resolve local-local pairs
        for (let k=0,len=currentCell.bodies.length; k<len; k++) {
          const localBody = currentCell.bodies[k];
          if (currentBody.uuid === localBody.uuid) continue;
          localResolver(currentBody, localBody);
        }

        // Resolve local-neighbor pairs
        for (let k=0,len=neighborCells.length; k<len; k++) {
          const currentNeighborCell = neighborCells[k];
          for (let l=0,len=currentNeighborCell.bodies.length; l<len; l++) {
            const neighborBody = currentNeighborCell.bodies[l];
            neighborResolver(currentBody, neighborBody);
          }
        }
      }
    }
	}

}

module.exports = SpatialInteraction;
