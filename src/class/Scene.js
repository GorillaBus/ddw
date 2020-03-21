class Scene {

	constructor(settings) {
		settings = settings || {};
    this.models = settings.models || [];
		this.width = settings.width || 800;
		this.height = settings.height || 600;
    this.drawer = settings.drawer;
		this.ctx = settings.ctx;
		this.init();
	}

	init() {
		// Set boundries
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
    this.draw();
  }

	draw() {
    for (let i=0, len=this.models.length; i<len; i++) {
      this.drawer.draw(this.models[i], this.ctx);
    }
	}

}

module.exports = Scene;
