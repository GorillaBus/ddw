const GlobalInteraction = require("./GlobalInteraction");

class Gravity extends GlobalInteraction {

  constructor(settings) {
    super(settings);
    this.gravitate = this.gravitate.bind(this);
  }

  run(bodies) {
    this.resolve(bodies, this.gravitate);
  }

  gravitate(bodyA, bodyB) {
    bodyA.gravitateTo(bodyB);
  }

}

module.exports = Gravity;
