const GlobalInteraction = require("./GlobalInteraction");
const Vector = require("./Vector");

class GravityInteraction extends GlobalInteraction {

  constructor(settings) {
    super(settings);
    this.gravitate = this.gravitate.bind(this);
  }

  run() {
    this.resolve(this.gravitate);
  }

  prepare() {
    for (let i=0,len=this.cells.length; i<len; i++) {
      const cell = this.cells[i];
      const centroid = new Vector();

      cell.mass = cell.bodies.reduce((acum, body) => {
        return acum + body.mass;
      }, 0);

      for (let x=0,len=cell.bodies.length; x<len; x++) {
        const body = cell.bodies[x];
        const factor = body.mass / cell.mass;
        const p = body.location.multiply(factor);
        centroid.addTo(p);
      }

      cell.massCentroid = centroid;
    }
  }

  gravitate(body, cell) {
    body.gravitateToCell(cell);
  }

}

module.exports = GravityInteraction;
