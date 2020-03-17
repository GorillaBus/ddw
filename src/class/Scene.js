class Scene {

	/**
	* Coordinates space, time and elements in the world. Offers an interface between user components and controls like playback, character control, etc.
	* @summary View file: {@link https://github.com/GorillaBus/ddw/blob/master/src/class/BodyManager.js https://github.com/GorillaBus/ddw/blob/master/src/class/Scene.js}.
	* @abstract
	* @constructor
	* @param {Object} settings - Json object with construction options.
	* @param {Int} [settings.width=800] - Scene width in pixels.
	* @param {Int} [settings.height=600] - Scene height in pixels.
  * @param {Viewport} [settings.viewport=null] - A viewport object, generally used as the camera.
	* @param {CanvasRenderingContext2D} settings.ctx - A canvas 2D rendering context.
	* @param {BodyManager} settings.bodyManager - A body manager object.
	*/
	constructor(settings) {
		settings = settings || {};
		this.width = settings.width || 800;
		this.height = settings.height || 600;
		this.ctx = settings.ctx;
		this.viewport = null;
		this.bodyManager = settings.bodyManager;
		this.debug = settings.debug || false;
		this.init();
	}

	/**
	* Initialization routine executed after construction: sets the drawing context to the center of the screen, computes screen boundries and binds the update function.
	* @method
	*/
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


	/**
	* Sets the viewport object to use as view reference when required.
	* @method
	* @param {Viewport} viewport - A Viewport object.
	*/
	setViewport(viewport) {
		this.viewport = viewport;
	}

	/**
	* An abstract method that must be implemented by classes that inherits from the scene class, defining an update routine, interactions pipeline and any other custom functionalities.
	* @abstract 
	* @method
	*/
	update() { }

	/**
	* Iterates through and draws each of the bodies that correspond to this scene.
	* @method
	*/
	drawBodies() {
		this.bodyManager.draw(this.viewport);
	}

	/**
	* Adds an array of bodies to the scene.
	* @method
	* @param {Aray} bodies - An array of bodies.
	*/
	addBodies(bodies) {
		this.bodyManager.add(bodies);
	}

	/**
	* Runs the update pipeline for all the bodies corresponding to this scene.
	* @method
	*/
	updateBodies() {
		this.bodyManager.update();
	}

	/**
	* Runs interactions pipeline throgh all the corresponding scene bodies
	* @method
	*/
	interactBodies() {
		this.bodyManager.runInnteractions();
	}

	/**
	* Prints the given text in the given x,y positions of the screen.
	* @method
	* @param {String} text - A text to print.
	* @param {Float} x - The x coordinate of the 2d drawing context.
	* @param {Float} y - The y coordinate of the 2d drawing context.
	*/
	print(text, x, y) {
		x = x || 200;
		y = y || 200;
		this.ctx.font = "16px Arial";
		this.ctx.fillStyle = "red";
		this.ctx.fillText(text, x, y);
	}
}

module.exports = Scene;
