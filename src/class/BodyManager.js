class BodyManager {

/**
 * Manages the different bodies within a scene, handling updating, drawing, body iterations. Usually when creating a scene a group of bodies would be created and added to a BodyManager, but bodies can be added or removed dynamically during the scene's playback. A special object of type Viewport can be specified to be used as a camera.
 * @summary View file: {@link https://github.com/GorillaBus/ddw/blob/master/src/class/BodyManager.js https://github.com/GorillaBus/ddw/blob/master/src/class/BodyManager.js}.
 * @constructor
 * @param {Object} settings - Json object with construction options
 * @param {Array} [settings.bodies=[]] - An array of body object to be added on initialization.
 * @param {Drawer} [settings.drawer=0] - A drawer object, used to draw the bodie models on screen.
 * @param {Intersector} settings.intersector - An intersector object.
 * @param {Array} [settings.interactions=[]] - An array of interaction objects.
 */
	constructor(settings) {
		this.debug = settings.debug || false;
		this.bodies = settings.bodies || [];
		this.drawer = settings.drawer;
		this.intersector = settings.intersector;
		this.collisionResolver = settings.collisionResolver;
		this.interactions = settings.interactions || [];
	}

/**
 * Returns the total amount of managed objects.
 * @method
 * @returns {Int} number of bodies.
 */
	getLength() {
		return this.bodies.length;
	}

/**
 * Adds an array of bodies to the manager.
 * @method
 * @param {Array} bodies - An array of body objects
 */
	add(bodies) {
		this.bodies = this.bodies.concat(bodies);
	}

/**
 * Runs the global update routing that involves updating, transforming and interacting between bodies to update their state in the world. The viewport object is updated but removed from the pipeline before running interactions.
 * @method
 */
	update() {
		for (let j=0,len=this.interactions.length; j<len; j++) this.interactions[j]. resetGrid();
		for (let i=0, len=this.bodies.length; i<len; i++) {
			const body = this.bodies[i];
			body.update();
			// if (body.constructor.name === 'Viewport') continue;
			// for (let j=0,len=this.interactions.length; j<len; j++) {
			// 	this.interactions[j].registerBody(body);
			// }
		}
	}

/**
 * Iterates through and runs all available interactions between bodies (like gravity, collisions or user interactions).
 * @method
 */
	runInnteractions() {
		// for (let i=0,len=this.bodies.length; i<len; i++) {
		// 	const bodyA = this.bodies[i];
		// 	for (let x=0,len=this.bodies.length; x<len; x++) {
		// 		const bodyB = this.bodies[x];
		// 		if (bodyA.uuid === bodyB.uuid) continue;
		// 		bodyA.gravitateTo(bodyB);
		// 	}
		// }
		//for (let y=0, len=this.interactions.length; y<len; y++) this.interactions[y].run();

		for (let i=0,len=this.bodies.length; i<len; i++) {
			const bodyA = this.bodies[i];
			for (let x=0,len=this.bodies.length; x<len; x++) {
				const bodyB = this.bodies[x];
				if (bodyA.uuid === bodyB.uuid || bodyB.constructor.name === 'Viewport') continue;

				const intersection = this.intersector.circleCircle(bodyA.worldTransform.boundingBox, bodyB.worldTransform.boundingBox);
				if (intersection) {
					this.collisionResolver.elastic(bodyA, bodyB, intersection);
				}
			}
		}
	}

/**
 * Returns a body by its id (performing a lookup).
 * @method
 * @param {Int} uuid - The unique id of the requested body.
 * @returns {Body} A body or null if the requested id was not found.
 */
	getBodyById(uuid) {
		for (let i=0,len=this.bodies.length; i<len; i++) {
			if (this.bodies[i].uuid === uuid) {
				return this.bodies[i];
			}
		}
		return null;
	}

/**
 * Draws all bodies in the view perspective of a given reference viewport.
 * @method
 * @param {Viewport} viewport - A viewport object.
 */
	draw(viewport) {
		const viewportModel = viewport.worldTransform.transform(0, 1).boundingBox;
		for (let i=0, len=this.getLength(); i<len; i++) {
			const body = this.bodies[i];
			if (!body.visible) continue;
			const bodyModel = body.worldTransform.boundingBox;
			const intersects = this.intersector.circleInRectangle(bodyModel, viewportModel);
			if (intersects) {
				body.transformToView(viewport);
				this.drawer.draw(body.viewTransform.getShapes());
				if (this.debug) {
					this.drawer.drawPolygon(body.viewTransform.boundingBox);
				}
			}
		}
	}
}

module.exports = BodyManager;
