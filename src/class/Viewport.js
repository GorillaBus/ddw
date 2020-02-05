const Body = require("./Body");

class Viewport extends Body {
	constructor(settings) {
		const x = settings.width / 2;
		const y = settings.height / 2;

		super({
				x: 0,
				y: 0,
				angle: 0,
				scale: settings.scale,
				modelData: {
					debugColor: "#ffffff",
					shapes: [{
						visible: false,
						points: [
							{ x: -x, y: -y },
							{ x, y: -y },
							{ x, y },
							{ x: -x, y }
						]
					}]
				}
			});


		this.attachedTo = settings.attachedTo || false;
	}

	attachTo(body) {
		this.attachedTo = body;
		this.location = body.location;
	}

	detach() {
		this.location = this.attachedTo.copy();
		this.attachedTo = null;
	}

	rotateLeft() {
		if (this.attachedTo) return;
		this.angle -= 0.1;
	}

	rotateRight() {
		if (this.attachedTo) return;
		this.angle += 0.1;
	}

	scaleUp() {
		this.scale -= 0.01;
	}

	scaleDown() {
		this.scale += 0.01;
	}

	move(x, y) {
		if (this.attachedTo) return;
		this.location.setX(this.location.getX() + x);
		this.location.setY(this.location.getY() + y);
	}

	getLocation() {
		return this.attachedTo ? this.attachedTo.location : this.location;
	}

	setLocation(location) {
		this.location = location;
	}

	getScale() {
		return this.scale;
		// return this.attachedTo ? this.attachedTo.scale : this.scale;
	}

	setScale(value) {
		this.scale = value;
	}

	getAngle() {
		return this.angle;
		//return this.attachedTo ? this.attachedTo.angle : this.angle;
	}

	setAngle(angle) {
		this.angle = angle;
	}
}

module.exports = Viewport;
