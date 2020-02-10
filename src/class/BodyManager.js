
class BodyManager {

	constructor(settings) {
		this.debug = settings.debug || false;
		this.bodies = settings.bodies || [];

		this.drawer = settings.drawer;
		this.intersector = settings.intersector;
		this.collisionResolver = settings.collisionResolver;
	}

	setViewport(viewport) {
		this.viewport = viewport;
	}

	getLength() {
		return this.bodies.length;
	}

	add(bodies) {
		this.bodies = this.bodies.concat(bodies);
	}

	update() {
		for (let i=0, len=this.bodies.length; i<len; i++) {
			const body = this.bodies[i];
			body.update();
			body.transformToWorld();
		}
	}

	runInteractions() {
		for (let i=0, len=this.bodies.length; i<len; i++) {
			const body1 = this.bodies[i];

			if (this.viewport && body1.uuid === this.viewport.uuid) continue;

			for (let y=0; y<len; y++) {
				const body2 = this.bodies[y];

				if (body2.uuid === body1.uuid || this.viewport && body2.uuid === this.viewport.uuid) continue;

				/* 3. Check intersection */
				const intersection = this.intersector.circleCircle(body1.worldTransform.boundingBox, body2.worldTransform.boundingBox);

				/* 4. Resolve collisions */
				if (intersection) {
					this.collisionResolver.elastic(body1, body2, intersection);
				}

				/* 5. Apply forces */
				body1.gravitateTo(body2);
			}
		}
	}

	draw(view) {
		view === 'viewport' ? this.drawViewportTransform() : this.drawWorldTransform();
	}

	drawWorldTransform() {
		for (let i=0, len=this.bodies.length; i<len; i++) {
			const body = this.bodies[i];
			this.drawer.draw(body.worldTransform.getShapes());
			if (this.debug) {
				this.drawer.drawPolygon(body.worldTransform.boundingBox);
			}
		}
	}

	drawViewportTransform() {
		// Cache the viewport model: rotated back to its initial angle
		const viewportModel = this.viewport.worldTransform.transform(0, 1).boundingBox;

		for (let i=0, len=this.getLength(); i<len; i++) {
			const body = this.bodies[i];

			if (!body.visible) continue;

			// Check if body is inside viewport

			const bodyModel = body.worldTransform.boundingBox;
			const intersects = this.intersector.circleInRectangle(bodyModel, viewportModel);

			if (intersects) {
				body.transformToView(this.viewport);
				this.drawer.draw(body.viewTransform.getShapes());

				if (this.debug) {
					this.drawer.drawPolygon(body.viewTransform.boundingBox);
				}
			}
		}
	}

}

module.exports = BodyManager;
