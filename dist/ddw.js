var ddw =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Utils = __webpack_require__(/*! ./src/class/Utils */ "./src/class/Utils.js");
const PolygonGenerator = __webpack_require__(/*! ./src/class/PolygonGenerator */ "./src/class/PolygonGenerator.js");
const Model = __webpack_require__(/*! ./src/class/Model */ "./src/class/Model.js");
const ModelDrawer = __webpack_require__(/*! ./src/class/ModelDrawer */ "./src/class/ModelDrawer.js");
const Scene = __webpack_require__(/*! ./src/class/Scene */ "./src/class/Scene.js");
const ScenePlayer = __webpack_require__(/*! ./src/class/ScenePlayer */ "./src/class/ScenePlayer.js");
const Body = __webpack_require__(/*! ./src/class/Body */ "./src/class/Body.js");
const Vector = __webpack_require__(/*! ./src/class/Vector */ "./src/class/Vector.js");
const Viewport = __webpack_require__(/*! ./src/class/Viewport */ "./src/class/Viewport.js");
const SpatialPartitioner = __webpack_require__(/*! ./src/class/SpatialPartitioner */ "./src/class/SpatialPartitioner.js");
const GlobalInteraction = __webpack_require__(/*! ./src/class/GlobalInteraction */ "./src/class/GlobalInteraction.js");
const SpatialInteraction = __webpack_require__(/*! ./src/class/SpatialInteraction */ "./src/class/SpatialInteraction.js");
const Collision = __webpack_require__(/*! ./src/class/Collision */ "./src/class/Collision.js");
const Gravity = __webpack_require__(/*! ./src/class/Gravity */ "./src/class/Gravity.js");
const Physics = __webpack_require__(/*! ./src/class/Physics */ "./src/class/Physics.js");
const Geometry = __webpack_require__(/*! ./src/class/Geometry */ "./src/class/Geometry.js");

module.exports = {
	Utils,
	PolygonGenerator,
	Model,
	ModelDrawer,
	Scene,
	Body,
	ScenePlayer,
	Vector,
	Viewport,
	SpatialPartitioner,
	SpatialInteraction,
	GlobalInteraction,
	Collision,
	Gravity,
	Physics,
	Geometry
}


/***/ }),

/***/ "./src/class/Body.js":
/*!***************************!*\
  !*** ./src/class/Body.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Vector = __webpack_require__(/*! ./Vector */ "./src/class/Vector.js");
const Utils = __webpack_require__(/*! ./Utils */ "./src/class/Utils.js");

class Body {

	constructor(settings) {
		settings = settings || {};
		settings.x = settings.x || 0;
		settings.y = settings.y || 0;
    settings.speed = settings.speed || 0;
		settings.heading = settings.heading || 0;

    this.angleAcceleration = 0;
    this.angleVelocity = settings.angleVelocity || 0;
		this.angle = settings.angle || 0;
		this.acceleration = new Vector({ x: 0, y: 0 });
		this.velocity = new Vector({ length: settings.speed, angle: settings.heading });
		this.location = new Vector({ x: settings.x, y: settings.y });
		this.mass = settings.mass || 1;
		this.scale = settings.scale || 1;
		this.uuid = Utils.uniqueID();
    this.model = settings.model;
    this.world = this.getWorldTransform();
	}

  getAngle() {
    return this.angle;
  }

  getScale() {
    return this.scale;
  }

	getHeading() {
		return this.velocity.getAngle();
	}

	setHeading(angle) {
		this.velocity.setAngle(angle);
	}

	getSpeed() {
		return this.velocity.getLength();
	}

	setSpeed(speed) {
		this.velocity.setLength(speed);
	}

  getLocation() {
    return this.location;
  }

	getBoundingRect() {
		return [
			[this.world.bounds.xMin, this.world.bounds.yMin],
			[this.world.bounds.xMin, this.world.bounds.yMax],
			[this.world.bounds.xMax, this.world.bounds.yMax],
			[this.world.bounds.xMax, this.world.bounds.yMin]
		];
	}

	update() {
    // Update Position
		this.velocity.addTo(this.acceleration);
		this.location.addTo(this.velocity);
		this.acceleration.multiplyBy(0);
    // Update angle
    this.angleVelocity += this.angleAcceleration;
    this.angle += this.angleVelocity;
    this.angleAcceleration = 0;
    // World transformation
    this.world = this.getWorldTransform();
	}

  getWorldTransform() {
    return this.model.transform(this.angle, this.scale, [this.location.getX(), this.location.getY()]);
  }

	getRadius() {
		return this.world.radius;
	}

	setPosition(position) {
		this.location = position;
	}

	applyForce(force) {
		let f = force.divide(this.mass);
		this.acceleration.addTo(f);
	}

	applyNetForce(force) {
		this.acceleration.addTo(force);
	}

	resetVelocity() {
		this.velocity.multiplyBy(0);
	}

	distanceTo(target) {
		return target.location.substract(this.location).getLength() - this.getRadius() - target.getRadius();
	}

}

module.exports = Body;


/***/ }),

/***/ "./src/class/Collision.js":
/*!********************************!*\
  !*** ./src/class/Collision.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const SpatialInteraction = __webpack_require__(/*! ./SpatialInteraction */ "./src/class/SpatialInteraction.js");
const Physics = __webpack_require__(/*! ./Physics */ "./src/class/Physics.js");
const Geometry = __webpack_require__(/*! ./Geometry */ "./src/class/Geometry.js");

class Collision extends SpatialInteraction {

  constructor(settings) {
    super(settings);
    this.physics = Physics;
    this.geometry = Geometry;
    this.intersector = settings.intersector;
    this.resolver = settings.resolver;
    this.collision = this.collision.bind(this);
  }

  run() {
    this.resolve(this.collision);
  }

  collision(bodyA, bodyB) {
    const intersection = this.geometry.circleCircleIntersection(bodyA.world, bodyB.world);
    if (intersection) {
      this.physics.elasticCollision(bodyA, bodyB, intersection);
    }
  }

}

module.exports = Collision;


/***/ }),

/***/ "./src/class/Geometry.js":
/*!*******************************!*\
  !*** ./src/class/Geometry.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

class Geometry {

  rectangleRectangleIntersection(r1, r2) {
    return this.rangeIntersect(r1.bounds.xMin, r1.bounds.xMin + r1.width, r2.bounds.xMin, r2.bounds.xMin + r2.width) &&
      this.rangeIntersect(r1.bounds.yMin, r1.bounds.yMin + r1.height, r2.bounds.yMin, r2.bounds.yMin + r2.height);
  }

	circleRectangleIntersection(c, r) {
		const distX = Math.abs(c.center[0] - r.bounds.xMin - r.width / 2);
		const distY = Math.abs(c.center[1] - r.bounds.yMin - r.height / 2);
		// Out of range
		if (distX > (r.width / 2 + c.radius) || distY > (r.height / 2 + c.radius)) {
			return false;
		}
		// In range
		if (distX <= (r.width / 2) || distY <= (r.height / 2)) {
			return true;
		}
		// Rectangle corners
		const dx = distX - r.width / 2;
		const dy = distY - r.height / 2;
		return (dx * dx + dy * dy <= (c.radius * c.radius));
	}

	circleCircleIntersection(c1, c2) {
		const xDist = c1.center[0] - c2.center[0];
		const yDist = c1.center[1] - c2.center[1];
		const distSquared = (xDist * xDist) + (yDist * yDist);
		const radiusSquared = (c1.radius + c2.radius) * (c1.radius + c2.radius);
		if (distSquared < radiusSquared) {
			return { x: xDist, y: yDist, dist_squared: distSquared };
		}
		return false;
	}

  rangeIntersect(min0, max0, min1, max1) {
    return  Math.max(min0, max0) >= Math.min(min1, max1) &&
      Math.min(min0, max0) <= Math.max(min1, max1);
  }

}

module.exports = new Geometry();


/***/ }),

/***/ "./src/class/GlobalInteraction.js":
/*!****************************************!*\
  !*** ./src/class/GlobalInteraction.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

class GloalInteraction {

  run() { }

  resolve(bodies, cb) {
    for (let i=0, len=bodies.length; i<len; i++) {
      const bodyA = bodies[i];
      for (let j=0, len=bodies.length; j<len; j++) {
        const bodyB = bodies[j];
        if (bodyA.uuid === bodyB.uuid) continue;
        cb(bodyA, bodyB);
      }
    }
  }

}

module.exports = GloalInteraction;


/***/ }),

/***/ "./src/class/Gravity.js":
/*!******************************!*\
  !*** ./src/class/Gravity.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const GlobalInteraction = __webpack_require__(/*! ./GlobalInteraction */ "./src/class/GlobalInteraction.js");
const Physics = __webpack_require__(/*! ./Physics */ "./src/class/Physics.js");

class Gravity extends GlobalInteraction {

  constructor(settings) {
    super(settings);
    this.physics = Physics;
    this.gravitate = this.gravitate.bind(this);
  }

  run(bodies) {
    this.resolve(bodies, this.gravitate);
  }

  gravitate(bodyA, bodyB) {
    this.physics.gravity(bodyA, bodyB);
  }

}

module.exports = Gravity;


/***/ }),

/***/ "./src/class/Model.js":
/*!****************************!*\
  !*** ./src/class/Model.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

class Model {

	constructor(settings) {
    this.points = settings.points || [];
		this.strokeColor = settings.strokeColor || null;
    this.fillColor = settings.fillColor || null;
    this.fillGradient = settings.fillGradient || null;
		this.filter = settings.filter || null;
		this.bounds = this.getBounds();
		this.center = this.getCenter();
		this.width = this.bounds.xMax - this.bounds.xMin;
		this.height = this.bounds.yMax - this.bounds.yMin;
		this.radius = Math.max(this.width, this.height) / 2;
		this.children = settings.children || [];
	}

  getPoints() {
    return this.points;
  }

	getBounds() {
		const xs = [];
		const ys = [];
		for (let i=0,len=this.points.length; i<len; i++) {
			const point = this.points[i];
			xs.push(point[0]);
			ys.push(point[1]);
		}
		return {
			xMin: Math.min.apply(null, xs),
			xMax: Math.max.apply(null, xs),
			yMin: Math.min.apply(null, ys),
			yMax: Math.max.apply(null, ys)
		};
	}

	getCenter() {
		return [
			(this.bounds.xMin + this.bounds.xMax) / 2,
			(this.bounds.yMin + this.bounds.yMax) / 2
		];
	}

  transform(r, s, t) {
		t = t || [0, 0];
    const transformed = [];
		for (let j=0,len=this.points.length; j<len; j++) {
      let p = this.points[j];
			if (r !== null) { p = this.rotatePoint(p, r); }
			if (s !== null) { p = this.scalePoint(p, s); }
			if (t !== null) { p = this.translatePoint(p, t); }
			transformed.push(p);
		}
    return new this.constructor({
      points: transformed,
      strokeColor: this.strokeColor,
      fillColor: this.fillColor,
			fillGradient: this.fillGradient,//this.fillGradient ? this.transformGradient(this.fillGradient, r, s, t):null,
			filter: this.filter,
			children: this.children.map(c => c.transform(r, s, t))
    });
	}

	transformInversion(t, s, r) {
    const transformed = [];
		for (let j=0,len=this.points.length; j<len; j++) {
      let p = this.points[j];
			if (t !== null) { p = this.translatePoint(p, t); }
			if (s !== null) { p = this.scalePoint(p, s); }
			if (r !== null) { p = this.rotatePoint(p, r); }
			transformed.push(p);
		}
    return new this.constructor({
      points: transformed,
      strokeColor: this.strokeColor,
      fillColor: this.fillColor,
			fillGradient: this.fillGradient,
			filter: this.filter,
			children: this.children.map(c => c.transformInversion(t, s, r))
    });
	}

  rotatePoint(point, angle) {
    return [
      point[0] * Math.cos(angle) - point[1] * Math.sin(angle),
      point[0] * Math.sin(angle) + point[1] * Math.cos(angle)
    ];
  }

  scalePoint(point, scale) {
    return [
      point[0] * scale,
      point[1] * scale
    ]
  }

  translatePoint(point, position) {
    return [
      point[0] + position[0],
      point[1] + position[1]
    ]
  }

}

module.exports = Model;


/***/ }),

/***/ "./src/class/ModelDrawer.js":
/*!**********************************!*\
  !*** ./src/class/ModelDrawer.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Vector = __webpack_require__(/*! ./Vector */ "./src/class/Vector.js");

class ModelDrawer {

	drawModel(model, ctx) {
    const points = model.getPoints();

		if (model.filter) {
			ctx.save()
			ctx.filter = model.filter;
		}

		ctx.beginPath();
		for (let i = 0, len=points.length; i<len; i++) {
			const a = points[i];
			const b = i === len - 1 ? points[0] : points[i + 1];
			if (i === 0) {
				ctx.moveTo(a[0], a[1]);
			}
			ctx.lineTo(b[0], b[1]);
		}
		ctx.closePath();

		if (model.strokeColor) {
			ctx.strokeStyle = model.strokeColor;
			ctx.stroke();
		}

		if (model.fillColor) {
			ctx.fillStyle = model.fillColor;
			ctx.fill();
		}

		if (model.fillGradient) {
			ctx.fillStyle = this.createRadialGradient(model, ctx);
			ctx.fill();
		}

		if (model.filter) {
			ctx.restore();
		}

		model.children.map(m => this.drawModel(m, ctx));
	}

	drawBoundingRectangle(model, ctx) {
		ctx.beginPath();
    ctx.strokeStyle = "yellow";
    ctx.strokeRect(model.bounds.xMin, model.bounds.yMin, model.width, model.height);
    ctx.closePath();
	}

	drawBoundingCircle(model, ctx) {
		ctx.beginPath();
    ctx.strokeStyle = "yellow";
    ctx.arc(model.center[0], model.center[1], model.radius, 0, 2 * Math.PI);
		ctx.stroke();
		ctx.closePath();
	}

	drawInnerShadow(model, lightSource, ctx, shadowScale, shadowDisplacement, shadowSpread) {
		if (model.radius < 1) { return; }

		shadowScale = shadowScale || 6;
		shadowDisplacement = shadowDisplacement || 0.92;
		shadowSpread = shadowSpread || 0.94;

	  const shadowModelRadius = model.radius * shadowScale;
	  const shadowVector = new Vector({
	    x: model.center[0] - lightSource.center[0],
	    y: model.center[1] - lightSource.center[1]
	  });

	  shadowVector.normalize();
	  shadowVector.multiplyBy(shadowModelRadius * shadowDisplacement);
		shadowVector.x += model.center[0];
	  shadowVector.y += model.center[1];

	  ctx.save();

	  // Create clipping path
	  let region = new Path2D();
	  region.arc(model.center[0], model.center[1], model.radius + 1, 0, Math.PI*2, true);
	  ctx.clip(region);

	  // Shadow model
	  const gradient = ctx.createRadialGradient(shadowVector.getX(), shadowVector.getY(), shadowModelRadius * shadowSpread, shadowVector.getX(), shadowVector.getY(), shadowModelRadius);
	  gradient.addColorStop(0, "rgba(0, 0, 0, 0.9)");
	  gradient.addColorStop(1, "rgba(0, 0, 0, 0.001)");

	  ctx.beginPath();
	  ctx.fillStyle = gradient;
	  ctx.arc(shadowVector.getX(), shadowVector.getY(), shadowModelRadius, 0, Math.PI * 2, true);
	  ctx.fill();
	  ctx.closePath();

	  ctx.restore();
	}

	createRadialGradient(model, ctx) {
		const gradient = ctx.createRadialGradient(model.center[0],
																							model.center[1],
																							0,
																							model.center[0],
																							model.center[1],
																							model.radius);

		gradient.addColorStop(0, model.fillGradient.stop1);
		gradient.addColorStop(1, model.fillGradient.stop2);
		return gradient;
	}

}

module.exports = ModelDrawer;


/***/ }),

/***/ "./src/class/Physics.js":
/*!******************************!*\
  !*** ./src/class/Physics.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Vector = __webpack_require__(/*! ./Vector */ "./src/class/Vector.js");

class Physics {

  constructor(settings) {
    settings = settings || {};
    this.G = settings.G || 9.8;
  }

  gravity(source, target) {
		const dir = target.location.substract(source.location);
		const distance = dir.getLength();
		const minDistance = target.getRadius() + source.getRadius();
		if (minDistance > distance) {
			return;
		}
		const force = this.G * (source.mass * target.mass / (distance * distance));
		dir.normalize();
		dir.multiplyBy(force);
		source.applyForce(dir);
	}

  elasticCollision(source, target, intersection) {

		// Displacement vector (difference in velocity)
		const xVelocity = target.velocity.getX() - source.velocity.getX();
		const yVelocity = target.velocity.getY() - source.velocity.getY();

		// If both bodies are moving away from each other, discard collision
		const dotProduct = (intersection.x * xVelocity) + (intersection.y * yVelocity);

		// Collision handling
		if (dotProduct > 0) {

			// The resulting force from the collision (angle difference + velocity difference)
			const collisionScale = dotProduct / intersection.dist_squared;

			// Collision Vector:
			const collision = {
				x: intersection.x * collisionScale,
				y: intersection.y * collisionScale
			};

			// Restitution aproximation
			const totalDensity = source.density + target.density;
			const r1 = (source.density / totalDensity) / 2;
			const r2 = (target.density / totalDensity) / 2;


			// 2D Elastic collision
			const combinedMass = source.mass + target.mass;
			const collisionWeight1 = (2 * target.mass / combinedMass) * 0.1;
			const collisionWeight2 = (2 * source.mass / combinedMass) * 0.25;

			const collisionResult1 = new Vector({
				x: collisionWeight1 * collision.x,
				y: collisionWeight1 * collision.y
			});

			const collisionResult2 = new Vector({
				x: collisionWeight2 * collision.x,
				y: collisionWeight2 * collision.y
			})
			.multiply(-1);

			source.applyNetForce(collisionResult1);
			target.applyNetForce(collisionResult2);
		}
	}

  orbitDistanceBySpeed(body, target, speed) {
    return (body.mass * target.mass) / speed;
  }

  orbitSpeedByDistance(body, target, G) {
    G = G || 9.8;
    const distance = body.distanceTo(target);
    return Math.sqrt((G * target.mass) / distance);
  }

}

module.exports = new Physics();


/***/ }),

/***/ "./src/class/PolygonGenerator.js":
/*!***************************************!*\
  !*** ./src/class/PolygonGenerator.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

class PolygonGenerator {

  circle(settings) {
    const divs = settings.divs || 32;
    const radius = settings.radius || 1;
    const angleFraction = (Math.PI * 2) / settings.divs;
    const points = [];
    for (let i=0; i<divs; i++) {
      const point = [
        Math.cos(angleFraction * i + 1) * radius,
        Math.sin(angleFraction * i + 1) * radius,
      ];
      points.push(point);
    }
    return points;
  }

}

module.exports = new PolygonGenerator();


/***/ }),

/***/ "./src/class/Scene.js":
/*!****************************!*\
  !*** ./src/class/Scene.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Model = __webpack_require__(/*! ./Model */ "./src/class/Model.js");

class Scene {

	constructor(settings) {
		settings = settings || {};
    this.bodies = settings.bodies || [];
		this.width = settings.width || 800;
		this.height = settings.height || 600;
		this.lightSource = settings.lightSource || null;
    this.viewport = settings.viewport;
    this.drawer = settings.drawer;
		this.ctx = settings.ctx;
		this.spatialInteractions = settings.spatialInteractions || [];
		this.globalInteractions = settings.globalInteractions || [];
    this.playerFps = 0;
    this.debug = settings.debug || false;
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
    this.runSpatialInteractions();
		this.runGlobalInteractions();

		if (this.debug) this.debugDraw();
    this.draw();
  }

  update() {
    this.viewport.update();
		this.resetSpatialInteractions();
    for (let i=0, len=this.bodies.length; i<len; i++) {
      const body = this.bodies[i];
      body.update();
      this.spatialRegister(body);
    }
	}

	draw() {
		const lightSourceViewModel = this.lightSource ? this.viewport.getRelativeView(this.lightSource):null;

    for (let i=0, len=this.bodies.length; i<len; i++) {
      const body = this.bodies[i];
      if (this.viewport.intersects(body)) {

				const bodyViewModel = this.viewport.getRelativeView(body);

				this.drawer.drawModel(bodyViewModel, this.ctx);

				if (body.drawShadow && this.lightSource && this.lightSource.uuid !== body.uuid) {
					this.drawer.drawInnerShadow(bodyViewModel, lightSourceViewModel, this.ctx);
				}

      }
    }

		// Framerate
    this.printText("FPS: "+ this.playerFps);
	}

	debugDraw() {
    // Display Spatial Partitioning grids
		this.spatialInteractions.forEach(spi => {
			if (spi.debug) this.drawSpatialGrid(spi);
		});
  }

	runGlobalInteractions() {
		for (let i=0,len=this.globalInteractions.length; i<len; i++) {
			this.globalInteractions[i].run(this.bodies);
		}
	}

	runSpatialInteractions() {
		for (let i=0,len=this.spatialInteractions.length; i<len; i++) {
			this.spatialInteractions[i].run();
		}
	}

	resetSpatialInteractions() {
		for (let i=0,len=this.spatialInteractions.length; i<len; i++) {
			this.spatialInteractions[i].resetGrid();
		}
	}

	spatialRegister(body) {
		for (let i=0,len=this.spatialInteractions.length; i<len; i++) {
			this.spatialInteractions[i].registerBody(body);
		}
	}

	drawSpatialGrid(spi) {
		const cells = spi.getCells();
    const cellSize = spi.cellSize;

    cells.forEach(c => {
			const neighborRange = cellSize * spi.neighborRange;
      const cellModel = new Model({
        points: [
          [c.x * cellSize, c.y * cellSize],
          [c.x * cellSize + cellSize, c.y * cellSize],
          [c.x * cellSize + cellSize, c.y * cellSize + cellSize],
          [c.x * cellSize, c.y * cellSize + cellSize],
        ],
        strokeColor: "rgba(0, 255, 0, 0.6)"
      });
			const neighborhoodModel = new Model({
        points: [
          [c.x * cellSize - neighborRange, c.y * cellSize - neighborRange],
          [c.x * cellSize + cellSize + neighborRange, c.y * cellSize - neighborRange],
          [c.x * cellSize + cellSize + neighborRange, c.y * cellSize + cellSize + neighborRange],
          [c.x * cellSize - neighborRange, c.y * cellSize + cellSize + neighborRange]
        ],
        strokeColor: "rgba(55, 20, 0, 0.6)"
      });
      const v1 = this.viewport.getRelativeView({ getScale: () => 1, world: cellModel });
			const v2 = this.viewport.getRelativeView({ getScale: () => 1, world: neighborhoodModel });
			this.drawer.drawModel(v1, this.ctx);
			this.drawer.drawModel(v2, this.ctx);
    });

	}

  printText(text, x, y) {
    x = x || this.boundries[0].x;
    y = y || this.boundries[0].y + 20;
    this.ctx.font = "16px Arial";
    this.ctx.fillStyle = "red";
    this.ctx.fillText(text, x, y);
  }

}

module.exports = Scene;


/***/ }),

/***/ "./src/class/ScenePlayer.js":
/*!**********************************!*\
  !*** ./src/class/ScenePlayer.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

class ScenePlayer {

	constructor(settings) {
		settings = settings || {};
		this.scene = settings.scene;
		this.fps = settings.fps || 60;
		this.playing = false;
		this.requestId = null;
		this.then = 0;
		this.startTime = 0;
		this.fpsInterval = 1000 / this.fps;
		this.frameCount = 0;
		this.framerate = 0;
		this.forward = this.forward.bind(this);
	}

	getFps() {
		return this.framerate;
	}

	play() {
		this.playing = true;
		this.reset();
		this.forward();
	}

	forward(newtime) {
		this.requestId = window.requestAnimationFrame(this.forward);
    const elapsed = newtime - this.then;
    if (elapsed > this.fpsInterval) {
        this.then = newtime - (elapsed % this.fpsInterval);
				// Draw scene
				this.scene.run();
				// Calculate framerate
        const sinceStart = newtime - this.startTime;
        this.framerate = Math.round(1000 / (sinceStart / ++this.frameCount) * 100) / 100;
				// Pass framerate to scene
				this.scene.playerFps = this.framerate;
		}
	}

	stop() {
		if (!this.playing) { return false; }
		window.cancelAnimationFrame(this.requestId);
		this.playing = false;
		this.requestId = null;
	}

	reset() {
		this.then = performance.now();
    this.startTime = this.then;
		this.frameCount = 0;
	}

}

module.exports = ScenePlayer;


/***/ }),

/***/ "./src/class/SpatialInteraction.js":
/*!*****************************************!*\
  !*** ./src/class/SpatialInteraction.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const SpatialPartitioner = __webpack_require__(/*! ./SpatialPartitioner */ "./src/class/SpatialPartitioner.js");

class SpatialInteraction extends SpatialPartitioner {

  run() { }

  resolve(localResolver, neighborResolver) {
    neighborResolver = neighborResolver || localResolver;

    // Iterate cells
    for (let i=0, len=this.cells.length; i<len; i++) {
      const currentCell = this.cells[i];

      // Find neighbor cells
      const neighborCells = this.getNeighborCells(currentCell);

      // Iterate local bodies
      for (let j=0,len=currentCell.bodies.length; j<len; j++) {
        const currentBody = currentCell.bodies[j];

        // Resolve local-local pairs
        for (let k=0,len=currentCell.bodies.length; k<len; k++) {
          const localBody = currentCell.bodies[k];
          if (currentBody.uuid === localBody.uuid) continue;
          localResolver(currentBody, localBody);
        }

        // Resolve local-neighbor pairs
        for (let k=0,len=neighborCells.length; k<len; k++) {
          const currentNeighborCell = neighborCells[k];
          for (let l=0,len=currentNeighborCell.bodies.length; l<len; l++) {
            const neighborBody = currentNeighborCell.bodies[l];
            neighborResolver(currentBody, neighborBody);
          }
        }
      }
    }
	}

}

module.exports = SpatialInteraction;


/***/ }),

/***/ "./src/class/SpatialPartitioner.js":
/*!*****************************************!*\
  !*** ./src/class/SpatialPartitioner.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

class SpatialPartitioner {

	constructor(settings) {
		settings = settings || {};
		this.cellSize = settings.cellSize || 128;
    this.neighborRange = settings.neighborRange || 1;
		this.cells = [];
    this.cellIndex = {};
		this.debug = settings.debug || false;
	}

  run() { }

	getCell(cellId) {
		if (this.cellIndex[cellId]) {
      return this.cellIndex[cellId];
    }
	}

	getCells() {
		return this.cells;
	}

  getNeighborCells(cell) {
    const neighborCells = [];
    const neighborIds = this.getNeighborCellIds(cell.x, cell.y);
    for (let i=0,len=neighborIds.length; i<len; i++) {
      const id = neighborIds[i];
      const neighbor = this.getCell(id);
      if (neighbor) {
        neighborCells.push(neighbor);
      }
    }
    return neighborCells;
  }

  getNeighborCellIds(x, y) {
    return [
      [x - 1, y - 1].join("_"),
      [x, y - 1].join("_"),
      [x + 1, y - 1].join("_"),
      [x + 1, y].join("_"),
      [x + 1, y + 1].join("_"),
      [x, y + 1].join("_"),
      [x - 1, y + 1].join("_"),
      [x - 1, y].join("_")
    ];
  }

	addCell(cellData) {
    const cell = {
			...cellData,
			bodies: []
		};
		this.cells.push(cell);
    this.cellIndex[cellData.id] = cell;
		return cell;
	}

	resetGrid() {
		this.cells = [];
    this.cellIndex = {};
	}

  registerBody(body, center) {
    const point = body.world.getCenter();
    const cellData = this.pointPosition(point);

    // Create new cell if required
    let cell = this.getCell(cellData.id);
    if (!cell) {
      cell = this.addCell(cellData);
    }

    // Add body in cell's collection
    cell.bodies.push(body);
  }

	pointPosition(point) {
		const xComponent = Math.floor(point[0] / this.cellSize);
		const yComponent = Math.floor(point[1] / this.cellSize);
    return {
      x: xComponent,
      y: yComponent,
      id: [xComponent, yComponent].join("_")
    }
	}

}

module.exports = SpatialPartitioner;


/***/ }),

/***/ "./src/class/Utils.js":
/*!****************************!*\
  !*** ./src/class/Utils.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

class Utils {

  /**
  * Generates a unique id.
  * @method
  * @returns {String} - A unique id.
  */
  uniqueID() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }

  /**
  * Returns a random value between the defined range.
  * @method
  * @param {Float} min - Minimum value of the range.
  * @param {Float} max - Maximum value of the range.
  * @returns {Float} - A random value between min and max.
  */
  randomRange(min, max) {
    return min + Math.random() * (max - min);
  }

  mapRange(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
  }

  /**
  * Generates a random angle between -pi and +pi.
  * @method
  * @returns {Float} - An angle in radians.
  */
  randomAngle() {
    return this.randomRange(-Math.PI, Math.PI);
  }

  componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }

  hexToRgb(hex) {
   var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
   return result ? {
     r: parseInt(result[1], 16),
     g: parseInt(result[2], 16),
     b: parseInt(result[3], 16)
   } : null;
 }

 randomColor() {
   return "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
 }

}

const instance = new Utils();

module.exports = instance;


/***/ }),

/***/ "./src/class/Vector.js":
/*!*****************************!*\
  !*** ./src/class/Vector.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

class Vector {

  /**
  * A 2D vector class that provides a wide range of vector operations.
  * @summary View file: {@link https://github.com/GorillaBus/ddw/blob/master/src/class/BodyManager.js https://github.com/GorillaBus/ddw/blob/master/src/class/Shape.js}.
  * @constructor
  * @param {Object} settings - Json object with construction options.
  * @param {Float} [settings.x=0] - Initial X vector component.
  * @param {Float} [settings.y=0] - Initial Y vector component.
  * @param {Float} [settings.length=0] - Initial vector magnitude or length.
  * @param {Float} [settings.angle=0] - Initial vector angle in radians.
  */
  constructor(settings) {
    settings = settings || {};
    settings.x = settings.x || 0;
    settings.y = settings.y || 0;
    settings.length = settings.length || 0;
    settings.angle = settings.angle || 0;
    this.x = settings.x;
    this.y = settings.y;
    if (settings.length) {
      this.setLength(settings.length);
    }
    if (settings.angle) {
      this.setAngle(settings.angle);
    }
  }

  /**
  * Sets the X component of the vector.
  * @method
  * @param {Float} magnitude - Vector magnitude over the X axis.
  */
  setX(magnitude) {
    this.x = magnitude;
  }

  /**
  * Gets the X component of the vector.
  * @method
  * @returns {Float} Vector magnitude over the X axis.
  */
  getX() {
    return this.x;
  }

  /**
  * Sets the Y component of the vector.
  * @method
  * @param {Float} magnitude - Vector magnitude over the Y axis.
  */
  setY(magnitude) {
    this.y = magnitude;
  }

  /**
  * Gets the Y component of the vector.
  * @method
  * @returns {Float} Vector magnitude over the Y axis.
  */
  getY() {
    return this.y;
  }

  /**
  * Sets the vector angle.
  * @method
  * @param {Float} angle - Angle in radians.
  */
  setAngle(angle) {
    let length = this.getLength();
    this.x = Math.cos(angle) * length;
    this.y = Math.sin(angle) * length;
  }

  /**
  * Gets the current vector's angle.
  * @method
  * @returns {Float} The vector's angle in radians.
  */
  getAngle() {
    return Math.atan2(this.getY(), this.getX());
  }

  /**
  * Sets the magnitude of the vector on it's current direction.
  * @method
  * @param {Float} length - The desired length for the vector.
  */
  setLength(length) {
    let angle = this.getAngle();
    this.x = Math.cos(angle) * length;
    this.y = Math.sin(angle) * length;
  }

  /**
  * Gets the current length of the vector.
  * @method
  * @returns {Float} The current vector's length.
  */
  getLength() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  /**
  * Tells if the vector has a length different than 0.
  * @method
  * @returns {Boolean} True when the vector's length is different than 0, false either.
  */
  hasLength() {
    return this.x !== 0 || this.y !== 0;
  }

  /**
  * Rotates the vector by a given angle in radians.
  * @method
  * @param {Float} angle - The rotation angle in radians.
  */
  rotateBy(angle) {
    const x = this.getX();
    const y = this.getY();
    this.x = x * Math.cos(angle) - y * Math.sin(angle);
    this.y = x * Math.sin(angle) + y * Math.cos(angle);
  }

  /**
  * Adds a given vector to the current vector, returning a new instance.
  * @method
  * @param {Vector} vector - A vector object.
  * @returns {Vector} The resulting vector object.
  */
  add(vector) {
    return new Vector({ x: this.x + vector.getX(), y: this.y + vector.getY() });
  }

  /**
  * Substracts a vector to the current vector, returning a new instance.
  * @method
  * @param {Vector} vector - A vector object.
  * @returns {Vector} The resulting vector object.
  */
  substract(vector) {
    return new Vector({ x: this.x - vector.getX(), y: this.y - vector.getY() });
  }

  /**
  * Muliplies the current vector by a given vector
  * @method
  * @param {Vector} vector - A vector object.
  * @returns {Vector} The resulting vector object.
  */
  multiply(value) {
    return new Vector({ x: this.x * value, y: this.y * value });
  }

  /**
  * Divides the current vector by a given vector.
  * @method
  * @param {Vector} vector - A vector object.
  * @returns {Vector} The resulting vector object.
  */
  divide(value) {
    return new Vector({ x: this.x / value, y: this.y / value });
  }

  /**
  * Adds a given vector to the current vector instance.
  * @method
  * @param {Vector} vector - A vector object.
  */
  addTo(vector) {
    this.x += vector.getX();
    this.y += vector.getY();
  }

  /**
  * Substracts a given vector from the current vector instance.
  * @method
  * @param {Vector} vector - A vector object.
  */
  substractFrom(vector) {
    this.x -= vector.getX();
    this.y -= vector.getY();
  }

  /**
  * Multiplies the current vector instance by a given vector.
  * @method
  * @param {Vector} vector - A vector object.
  */
  multiplyBy(value) {
    this.x *= value;
    this.y *= value;
  }

  /**
  * Divides the current vector instance by a given vector.
  * @method
  * @param {Vector} vector - A vector object.
  */
  divideBy(value) {
    this.x /= value;
    this.y /= value;
  }

  /**
  * Computes the dot product between the current instance and a given vector. Sometimes used to determine the relative position between the two vectors:<br/>&nbsp;&nbsp;<0 means B is behind<br/> &nbsp;&nbsp;=0 means B is in front<br/> &nbsp;&nbsp;>0 means B is at left/rights used to find the position of vector A with respect to vector B:<br/>
  * @method
  * @param {Vector} vector - A vector object.
  * @returns {Float} The dot product between the two vectors.
  */
  dot(vector) {
    return this.x * vector.x + this.y * vector.y;
  }

  /**
  * Computes the cross product between the current instance and a given vector.
  * @method
  * @param {Vector} vector - A vector object.
  * @returns {Float} The cross product between the two vectors.
  */
  cross(vector) {
    return (this.x * vector.y) - (this.y * vector.x);
  }

  /**
  * Computes the perpendicular dot product (or outer product) between two vectors to find the intersection point between the two given vectors.
  * @method
  * @param {Vector} vector - A vector object.
  * @returns {Vector} A vector object representing the intersection point between the two vectors.
  */
  perpDot(vector) {
    const v3 = this.substract(vector);
    const t = v3.cross(vector) / this.cross(vector);
    return new Vector({
      x: this.getX() + vector.getX() * t,
      y: this.getY() + vector.getY() * t
    });
  }

  /**
  * Computes the perpendicular vector from the defined from the current Vector instance to the given Vector.
  * @method
  * @param {Vector} vector - A vector object.
  * @returns {Array} A an array of Vector objects (left and right)
  */
  perpTo(vector) {
    const fromTarget = this.substract(vector);
    fromTarget.normalize();
    const perpLeft = new ddw.Vector({
      x: fromTarget.getY(),
      y: -fromTarget.getX(),
      length: 1
    });
    const perpRight = new ddw.Vector({
      x: -fromTarget.getY(),
      y: fromTarget.getX(),
      length: 1
    });
    return [ perpLeft, perpRight ];
  }

  /**
  * Computes the vector projection of the current instance along the given vector.
  * @method
  * @param {Vector} vector - A vector object.
  * @returns {Vector} A new vector instance representing the computed projection.
  */
  project(v) {
    const d = vector.dot(vector);
    if (d > 0) {
      const dp = this.dot(vector);
      const factor = dp / d;
      const rx = vector.copy();
      rx.multiplyBy(factor);
      return rx;
    }
    return new Vector();
  }

  /**
  * Computes the angle (in radians) formed between the current instance and a given vector.
  * @method
  * @param {Vector} vector - A vector object.
  * @returns {Float} Angle in radians.
  */
  angleBetween(vector) {
    let v1 = this.copy();
    let v2 = vector.copy();
    v1.normalize();
    v2.normalize();
    let dot = v1.dot(v2);
    let theta = Math.acos(dot);
    if (isNaN(theta)) {
      console.warn("Theta is 'NaN' on Vector.angleBetween()")
    }
    return theta;
  }

  /**
  * Returns the direction of the current vector's with respect to a given vector. The result is interpreted as:<br/>&nbsp;&nbsp;=0 in front<br/>&nbsp;&nbsp;-1 to the right<br/>&nbsp;&nbsp;=1 to the left
  * @method
  * @param {Vector} vector - A vector object.
  * @returns {Int} One integer of [-1, 0, 1] interpreted as "right", "in front", "left".
  */
  angleDirection(vector) {
    let crossProduct = this.cross(vector);
    if (crossProduct > 0.0) {
      return 1;
    } else if (crossProduct < 0.0) {
      return -1;
    } else {
      return 0;
    }
  }

  /**
  * Returns the angular difference betwee the current vector and a given vector
  * @method
  * @param {Vector} vector - A vector object.
  * @returns {Float} Angle in radians.
  */
  angleDifference(vector) {
    let theta = this.angleBetween(vector);
    let dir = this.angleDirection(vector);
    return theta * dir;
  }

  /**
  * Creates a copy of the current instance.
  * @method
  * @returns {Vector} A copy of the current instance.
  */
  copy() {
    return new Vector({
      x: this.getX(),
      y: this.getY()
    });
  }

  /**
  * Normalized the current vector instance converting it's magnitude to a value between 0 and 1.
  * @method
  */
  normalize() {
    var length = this.getLength();
    if (length != 0) {
      this.divideBy(length);
    }
  }

  /**
  * Computes the distance between the current instance and a given vector.
  * @method
  * @param {Vector} vector - A vector object.
  * @returns {Float} The distance between the two vector.
  */
  dist(vector) {
    let d = vector.substract(this);
    return d.getLength();
  }

  /**
  * Truncates the current instance's magnitude by a maximum value.
  * @method
  * @param {Float} max - The maximum magnitud for the vector's length.
  */
  limit(max) {
    if (this.getLength() > max) {
      this.setLength(max);
    }
  }

  /**
  * Resets the current instance's x and y components to 0.
  * @method
  */
  reset() {
    this.x = 0;
    this.y = 0;
  }

};

module.exports = Vector;


/***/ }),

/***/ "./src/class/Viewport.js":
/*!*******************************!*\
  !*** ./src/class/Viewport.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Body = __webpack_require__(/*! ./Body */ "./src/class/Body.js");
const Model = __webpack_require__(/*! ./Model */ "./src/class/Model.js");
const Utils = __webpack_require__(/*! ./Utils */ "./src/class/Utils.js");
const Geometry = __webpack_require__(/*! ./Geometry */ "./src/class/Geometry.js");

class Viewport extends Body {

  constructor(settings) {
    super({
				angle: settings.angle || 0,
				scale: settings.scale || 1,
				model: new Model({
          points: [
            [-settings.width/2, -settings.height/2],
            [-settings.width/2,  settings.height/2],
            [settings.width/2,   settings.height/2],
            [settings.width/2,  -settings.height/2]
          ]
        })
		});
    this.geometry = Geometry;
    this.width = settings.width || 800;
    this.height = settings.height || 600;
		this.attached = settings.attachTo || false;
    this.transitions = [];
	}

  update() {

    if (this.attached) {
      this.location.x = this.attached.location.getX();
      this.location.y = this.attached.location.getY();

    } else {

  		this.velocity.addTo(this.acceleration);
  		this.location.addTo(this.velocity);
  		this.acceleration.multiplyBy(0);
      this.angleVelocity += this.angleAcceleration;
      this.angle += this.angleVelocity;
      this.angleAcceleration = 0;
    }

    this.world = this.getWorldTransform();

    this.runTransitions();
	}

  intersects(body) {
    const main = this.geometry.rectangleRectangleIntersection(body.world, this.world);
    if (main) {
      return main;
    }
    if (body.world.children.length > 0) {
      for (let i=0,len=body.world.children.length; i<len; i++) {
        const child = body.world.children[i];
        const itc = this.geometry.rectangleRectangleIntersection(child, this.world);
        if (itc) {
          return itc;
        }
      }
    }
    return false;
  }

  attachTo(body) {
    this.attached = body;
  }

  detach() {
    this.attached = null;
  }

  addTransition(t) {
    this.detach();
    this.transitions.push(t);
  }

  runTransitions() {
    for (let i=0; i<this.transitions.length; i++) {

        const t = this.transitions[i];

        // Remove transition
        if (t.steps === 0) {
          if (typeof t.end === 'function') t.end();
          this.transitions.splice(i, 1);
          continue;
        }

        // Translation
        if (t['translate']) {
          const dir = t.translate.location.add(t.translate.velocity).substract(this.location);
          const dist = dir.getLength();
          const translateStep = dist / t.steps;
          dir.normalize();
          dir.multiplyBy(translateStep);
          this.location.addTo(dir);
        }

        // Scale
        if (t['scale']) {
          const scaleStep = (t.scale - this.scale) / t.steps;
          this.scale += scaleStep;
        }

        // Update transition state
        t.steps--;
    }
  }

  transitionTo(body, steps, zoom, cb) {
    body = body || null;
    steps = steps || 100;
    zoom = zoom || 2;
    cb = cb || null;
    const t = {
      steps,
      translate: body,
      scale: zoom,
      end: cb
    };
    this.addTransition(t);
  }

  getRelativeView(body) {
    const location = this.attached ? this.attached.location:this.location;
		const t = [
			location.getX() * -1,
			location.getY() * -1
		];
		const r = this.getAngle() * -1;
		const s = body.getScale() / this.getScale();
    return body.world.transformInversion(t, s, r);
  }

	rotateLeft(magnitude) {
		magnitude = magnitude || 0.01;
		this.angle -= magnitude;
	}

	rotateRight(magnitude) {
		magnitude = magnitude || 0.01;
		this.angle += magnitude;
	}

	scaleUp(factor) {
		factor = factor || 0.1;
    this.scale += this.scale * factor;
    this.scale += this.scale * factor;
	}

	scaleDown(factor) {
		factor = factor || 0.1;
    this.scale -= this.scale * factor;
    this.scale -= this.scale * factor;
	}

	move(x, y) {
    if (this.attached) { return }
		this.location.setX(this.location.getX() + x * this.scale);
		this.location.setY(this.location.getY() + y * this.scale);
	}

}

module.exports = Viewport;


/***/ })

/******/ });
//# sourceMappingURL=ddw.js.map