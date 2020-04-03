const Body = require("./Body");
const Model = require("./Model");

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
    this.width = settings.width || 800;
    this.height = settings.height || 600;
		this.attachedTo = settings.attachedTo || false;
    this.intersector = settings.intersector;
	}

  intersects(body) {
    return this.intersector.rectangleRectangle(body.world, this.world);
  }

  getRelativeView(body) {
		const t = [
			this.location.getX() * -1,
			this.location.getY() * -1
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
		this.location.setX(this.location.getX() + x * this.scale);
		this.location.setY(this.location.getY() + y * this.scale);
	}

}

module.exports = Viewport;
