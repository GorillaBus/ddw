class GloalInteraction {

  run() { }

  resolve(bodies, cb) {
    for (let i=0, len=bodies.length; i<len; i++) {
      const bodyA = bodies[i];
      for (let j=0, len=bodies.length; j<len; j++) {
        const bodyB = bodies[j];
        if (bodyA.uuid === bodyB.uuid) continue;
        cb(bodyA, bodyB);
      }
    }
  }

}

module.exports = GloalInteraction;
