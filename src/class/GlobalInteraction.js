const SpatialPartitioner = require("./SpatialPartitioner");

class GloalInteraction extends SpatialPartitioner {

  run() { }

  prepare() { console.log("Global") }

  resolve(cb) {
    for (let i=0,len=this.cells.length; i<len; i++) {
      const cell = this.cells[i];

      for (let x=0,len=cell.bodies.length; x<len; x++) {
        const body = cell.bodies[x];

        for (let j=0,len=this.cells.length; j<len; j++) {
          cb(body, this.cells[j]);
        }
      }
    }
  }

}

module.exports = GloalInteraction;
