class Scene {
	constructor(settings) {
		settings = settings || {};

		this.ctx = settings.ctx;
		this.width = settings.width || 800;
		this.height = settings.height || 600;
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
		this.view = settings.view || "viewport";
		this.viewScale = settings.viewScale || 1;
		this.debug = true; //settings.debug || false;
		this.viewport = settings.viewport;
		this.drawer = settings.drawer;
		this.intersector = settings.intersector;

		this.bodies = [];

		this.init();
	}

	init() {
		this.addBodies([this.viewport]);
		this.ctx.translate(this.width / 2, this.height / 2);
		this.update = this.update.bind(this);
	}

	update() { }

	draw() {
		this.view === 'viewport' ? this.drawViewport() : this.drawWorld();
	}

	drawWorld() {
		for (let i=0, len=this.bodies.length; i<len; i++) {
			const body = this.bodies[i];
			this.drawer.draw(body.worldTransform.getShapes());

			if (this.debug) {
				//this.drawer.drawBoundingBox(body.worldTransform.getBoundingBox());
			}
		}
	}

	drawViewport() {

		// Rotate viewport rectangle back to initial angle
		const rectangle = this.viewport.worldTransform.transform(0, 1).getBoundingBox();

		for (let i=0, len=this.bodies.length; i<len; i++) {
			const body = this.bodies[i];

			if (!body.visible) continue;
			const circle = {
				x: body.worldTransform.center.getX(),
				y: body.worldTransform.center.getY(),
				radius: body.worldTransform.radius
			};

			// Check if body is inside viewport
			const collides = this.intersector.circleInRectangle(circle, rectangle);
			if (collides) {
				body.transformToView(this.viewport);
				this.drawer.draw(body.viewTransform.getShapes());

				if (this.debug) {
					//this.drawer.drawBoundingBox(body.viewTransform.getBoundingBox());
				}
			}
		}
	}

	addBodies(bodies) {
		this.bodies = this.bodies.concat(bodies);
	}

	updateBodies() {
		for (let i=0, len=this.bodies.length; i<len; i++) {
			const body = this.bodies[i];
			body.update();
			body.transformToWorld();
		}
	}

	setView(viewReference) {
		viewReference = viewReference || 'viewport';
		this.view = viewReference;
	}

	isCamera(body) {
		return this.viewport.uuid === body.uuid;
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
