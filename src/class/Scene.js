class Scene {

	constructor(settings) {
		settings = settings || {};
    this.bodies = settings.bodies || [];
		this.width = settings.width || 800;
		this.height = settings.height || 600;
    this.viewport = settings.viewport;
    this.drawer = settings.drawer;
		this.ctx = settings.ctx;
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
    this.draw();
  }

  update() {
    this.viewport.update();
    for (let i=0, len=this.bodies.length; i<len; i++) {
      this.bodies[i].update();
    }
	}

	draw() {
    for (let i=0, len=this.bodies.length; i<len; i++) {
      const body = this.bodies[i];
      if (this.viewport.intersects(body)) {
        this.drawer.drawModel(body.world, this.ctx);
      }
    }
	}

}

module.exports = Scene;
