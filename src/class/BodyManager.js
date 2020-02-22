class BodyManager {

	constructor(settings) {
		this.debug = settings.debug || false;
		this.bodies = settings.bodies || [];
		this.viewport = null;
		this.drawer = settings.drawer;
		this.intersector = settings.intersector;
		this.collisionResolver = settings.collisionResolver;
		this.interactions = settings.interactions || [];
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
		for (let j=0,len=this.interactions.length; j<len; j++) this.interactions[j].resetGrid();

		for (let i=0, len=this.bodies.length; i<len; i++) {
			const body = this.bodies[i];
			body.update();
			body.transformToWorld();

			/* Only run on non-viewport bodies */
			if (this.viewport && body.uuid === this.viewport.uuid) continue;

			for (let j=0,len=this.interactions.length; j<len; j++) {
				this.interactions[j].registerBody(body);
			}
		}
	}

	runInnteractions() {
		// Iterate bodies (1)
		for (let i=0,len=this.bodies.length; i<len; i++) {
			const bodyA = this.bodies[i];

			// Iterate bodies (2)
			for (let x=0,len=this.bodies.length; x<len; x++) {
				const bodyB = this.bodies[x];
				if (bodyA.uuid === bodyB.uuid) continue;

				bodyA.gravitateTo(bodyB);
			}
		}


		for (let y=0, len=this.interactions.length; y<len; y++) {

			this.interactions[y].run((bodyA, bodyB)=> {
				const intersection = this.intersector.circleCircle(bodyA.worldTransform.boundingBox, bodyB.worldTransform.boundingBox);
				if (intersection) {
					this.collisionResolver.elastic(bodyA, bodyB, intersection);
				}
			});

		}
	}

	getBodyById(bodyId) {
		for (let i=0,len=this.bodies.length; i<len; i++) {
			if (this.bodies[i].uuid === bodyId) {
				return this.bodies[i];
			}
		}
	}

	runInteractionsB() {
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
