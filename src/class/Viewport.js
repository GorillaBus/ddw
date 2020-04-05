const Body = require("./Body");
const Model = require("./Model");
const Utils = require("./Utils");
const Geometry = require("./Geometry");

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
    return this.geometry.rectangleRectangleIntersection(body.world, this.world);
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
          t.end();
          this.transitions.splice(i, 1);
          continue;
        }

        // Translation
        if (t.hasOwnProperty('translate')) {
          const dir = t.translate.location.add(t.translate.velocity).substract(this.location);
          const dist = dir.getLength();
          const translateStep = dist / t.steps;
          dir.normalize();
          dir.multiplyBy(translateStep);
          this.location.addTo(dir);
        }

        // Scale
        if (t.hasOwnProperty('scale')) {
          const scaleStep = (t.scale - this.scale) / t.steps;
          this.scale += scaleStep;
        }

        // Update transition state
        t.steps--;
    }
  }

  transitionTo(body, steps) {
    steps = steps || 100;
    const t = {
      steps,
      translate: body,
      scale: 6,
      end: () => {
        this.attachTo(body);
      }
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
