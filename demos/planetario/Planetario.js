class Planetario {

  constructor() {
    this.star = null;
    this.bodies = [];
  }

  getBodies() {
    return this.bodies;
  }

  addStar(settings) {
    const star = this.createBody(settings);
    this.star = star;
    this.bodies.unshift(star);
  }

  addRecursiveObrbits(n) {
    if (!this.star) {
      throw "Planetario.addRecursiveObrbits(): create a star first";
    }

    this.createOrbits(this.star, n);

    for (let i=0,len=this.bodies.length; i<len; i++) {
      this.createOrbits(this.bodies[i], i);
    }
  }

  /*
    Sequentially creates orbits around a given Body in a way that each next orbit
    in the sequence has the correct mass, distance and velocity to keep a stable
    orbit.
  */
  createOrbits(body, n) {
    const distFactor = 3.15;
    const massFactor = 4.3;
    const minOrbitDist = body.getRadius() * 2;

    for (let i=0; i<n; i++) {
      const isFirst = body.orbits.length === 0;

      // Distance
      const distInit = isFirst ? minOrbitDist:body.distanceTo(body.orbits[body.orbits.length-1]);
      const distance = distInit * distFactor;

      // Mass
      const massInit = isFirst ? (body.mass * 0.00005):body.orbits[body.orbits.length-1].mass;
      const mass = massInit * massFactor;

      // Create orbit
      const angle = ddw.Utils.randomAngle();
      const pos = new ddw.Vector({
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
      });

      pos.addTo(body.location);

      const orbit = this.createBody({
        x: pos.getX(),
        y: pos.getY(),
        mass,
        speed: 1,
        fillColor: ddw.Utils.randomColor()
      });

      // Set heading to normal vector
      const nextOrbitPosition = orbit.location.add(orbit.velocity);
      const normals = body.location.perpTo(nextOrbitPosition);
      orbit.setHeading(normals[0].getAngle());

      // Find the orbital speed for the current distance and mass
      const speed = ddw.Physics.orbitSpeedByDistance(orbit, body);
      const currSpeed = body.getSpeed();
      orbit.setSpeed(speed);

      if (currSpeed > 0.1) {
        orbit.velocity.addTo(body.velocity);
      }

      body.addOrbit(orbit);

      this.bodies.push(orbit);
    }
  }

  /*
    A model requires physical properties -like mass, position, velocity- and a model
    to be represented in the screen. To create a model we first use de PolygonGenerator
    class to generate the sequence of points that define a circle.
    Models can be simple or comlex -compossed by many nested child-models-, as used
    for the outer brightness (or light rays) for planets and the star.
  */
  createBody(settings) {
    settings = settings || {};
    settings.mass = settings.mass || 100;
    settings.filter = settings.filter || null;
    settings.fillColor = settings.fillColor || null;
    settings.brightnessColor = settings.brightnessColor || "rgba(255, 255, 255, 0.06)";
    settings.innerLightColor = settings.innerLightColor || "rgba(255, 255, 255, 0.4)";
    settings.lightRadius = settings.lightRadius || 4;

    const modelRadius = Math.sqrt(settings.mass);

    // Main model points
    const poly = ddw.PolygonGenerator.circle({
      divs: 32,
      radius: modelRadius
    });

    // Inner brightness gradient values
    const stopA1 = "rgba(0, 0, 0, 0)";
    const stopA2 =  settings.innerLightColor;

    // Body model
    const model = new ddw.Model({
      points: poly,
      filter: settings.filter,
      fillColor: settings.fillColor,
      fillGradient: {
        stop1: stopA1,
        stop2: stopA2
      }
    });

    // Outer brightness (child) model points
    const lightModelPoints = ddw.PolygonGenerator.circle({
      divs: 32,
      radius: modelRadius * settings.lightRadius
    });

    // Outer brightness gradient vales
    const stopB1 = settings.brightnessColor;
    const stopB2 = "rgba(0, 0, 0, 0)";

    // Brightness model (child model)
    const lightraysModel = new ddw.Model({
      points: lightModelPoints,
      fillGradient: {
        stop1: stopB1,
        stop2: stopB2
      }
    });

    // Add outer brightness (child) model
    model.children = [ lightraysModel ];

    // Create the new body using the compossed model
    return new AstralBody({
      x: settings.x,
      y: settings.y,
      angle: settings.angle,
      model: model,
      mass: settings.mass,
      heading: settings.heading || Math.PI / 2,
      speed: settings.speed
    });
  }

}
