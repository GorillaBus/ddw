class AstralBody extends ddw.Body {

  constructor(settings) {
    super(settings);
    this.orbits = [];
    this.drawShadow = settings.drawShadow || true;
  }

  addOrbit(body) {
    this.orbits.push(body);
  }

  getOrbits() {
    return this.orbits;
  }

}
