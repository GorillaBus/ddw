const GlobalInteraction = require("./GlobalInteraction");
const Physics = require("./Physics");

class Gravity extends GlobalInteraction {

  constructor(settings) {
    super(settings);
    this.physics = Physics;
    this.gravitate = this.gravitate.bind(this);
  }

  run(bodies) {
    this.resolve(bodies, this.gravitate);
  }

  gravitate(bodyA, bodyB) {
    this.physics.gravity(bodyA, bodyB);
  }

}

module.exports = Gravity;
