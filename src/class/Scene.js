class Scene {

	constructor(settings) {
		settings = settings || {};
    this.bodies = settings.bodies || [];
		this.width = settings.width || 800;
		this.height = settings.height || 600;
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
    for (let i=0, len=this.bodies.length; i<len; i++) {
      this.bodies[i].update();
    }
	}

	draw() {
    for (let i=0, len=this.bodies.length; i<len; i++) {
      this.drawer.drawModel(this.bodies[i].world, this.ctx);
    }
	}

}

module.exports = Scene;
