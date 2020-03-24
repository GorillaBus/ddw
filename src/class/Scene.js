class Scene {

	constructor(settings) {
		settings = settings || {};
    this.bodies = settings.bodies || [];
		this.width = settings.width || 800;
		this.height = settings.height || 600;
    this.viewport = settings.viewport;
    this.drawer = settings.drawer;
		this.ctx = settings.ctx;
    this.collisions = settings.collisions;
		this.init();
	}

	init() {
		this.boundries = [{
			x: -this.width / 2,
			y: -this.height / 2
		}, {
			x: this.width / 2,
			y: -this.height / 2
		}, {
			x: this.width / 2,
			y: this.height / 2
		}, {
			x: -this.width / 2,
			y: this.height / 2
		}];
		this.ctx.translate(this.width / 2, this.height / 2);
		this.run = this.run.bind(this);
	}

	run() {
    this.ctx.clearRect(this.boundries[0].x, this.boundries[0].y, this.width, this.height);
    this.update();
    this.collisions.run();
    this.draw();
  }

  update() {
    this.viewport.update();
    this.collisions.resetGrid();
    for (let i=0, len=this.bodies.length; i<len; i++) {
      const body = this.bodies[i];
      body.update();
      this.collisions.registerBody(body);
    }
	}

	draw() {
    for (let i=0, len=this.bodies.length; i<len; i++) {
      const body = this.bodies[i];
      if (this.viewport.intersects(body)) {
        const perspectiveView = this.viewport.getRelativeView(body);
        this.drawer.drawModel(perspectiveView, this.ctx);
      }
    }
	}

}

module.exports = Scene;
