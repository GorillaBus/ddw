class Scene {
	constructor(settings) {
		settings = settings || {};

		/* Settings */
		this.debug = settings.debug || false;
		this.width = settings.width || 800;
		this.height = settings.height || 600;
		this.view = settings.view || "viewport";

		/* Dependencies */
		this.ctx = settings.ctx;
		this.bodyManager = settings.bodyManager;

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
		this.update = this.update.bind(this);
	}

	setViewReference(viewReference) {
		viewReference = viewReference || 'viewport';
		this.view = viewReference;
	}

	setViewport(body) {
		this.bodyManager.setViewport(body);
	}

	update() { }

	drawBodies() {
		this.bodyManager.draw(this.view);
	}

	addBodies(bodies) {
		this.bodyManager.add(bodies);
	}

	updateBodies() {
		this.bodyManager.update();
	}

	print(text, x, y) {
		x = x || 200;
		y = y || 200;
		this.ctx.font = "16px Arial";
		this.ctx.fillStyle = "red";
		this.ctx.fillText(text, x, y);
	}
}

module.exports = Scene;
