const Model = require("./Model");

class Scene {

	constructor(settings) {
		settings = settings || {};
    this.bodies = settings.bodies || [];
		this.width = settings.width || 800;
		this.height = settings.height || 600;
    this.viewport = settings.viewport;
    this.drawer = settings.drawer;
		this.ctx = settings.ctx;
    this.collisions = settings.collisions;
    this.gravity = settings.gravity;
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

    this.collisions.run();

    this.gravity.run();

    this.draw();
  }

  update() {
    this.viewport.update();

    this.collisions.resetGrid();
    this.gravity.resetGrid();

    for (let i=0, len=this.bodies.length; i<len; i++) {
      const body = this.bodies[i];
      body.update();

      this.collisions.registerBody(body);
      this.gravity.registerBody(body);
    }

    this.gravity.prepare();
	}

	draw() {
    for (let i=0, len=this.bodies.length; i<len; i++) {
      const body = this.bodies[i];
      if (this.viewport.intersects(body)) {
        const perspectiveView = this.viewport.getRelativeView(body);
        this.drawer.drawModel(perspectiveView, this.ctx);
      }
    }

    const cells = this.collisions.getCells();
    const cellSize = this.collisions.cellSize;
    cells.forEach(c => {
      const cellModel = new Model({
        points: [
          [c.x * cellSize, c.y * cellSize],
          [c.x * cellSize + cellSize, c.y * cellSize],
          [c.x * cellSize + cellSize, c.y * cellSize + cellSize],
          [c.x * cellSize, c.y * cellSize + cellSize],
        ],
        fillColor: "rgba(0, 255, 0, 0.3)"
      });
      // const t = this.viewport.getTransformProps();
      const perspectiveView = this.viewport.getRelativeView({ getScale: () => 1, world: cellModel });
      this.drawer.drawModel(perspectiveView, this.ctx);



      const t = [
  			this.viewport.location.getX() * -1,
  			this.viewport.location.getY() * -1
  		];
  		const r = this.viewport.getAngle() * -1;
  		const s = 1 / this.viewport.getScale();

      function rotatePoint(point, angle) {
        return [
          point[0] * Math.cos(angle) - point[1] * Math.sin(angle),
          point[0] * Math.sin(angle) + point[1] * Math.cos(angle)
        ];
      }

      function scalePoint(point, scale) {
        return [
          point[0] * scale,
          point[1] * scale
        ]
      }

      function translatePoint(point, position) {
        return [
          point[0] + position[0],
          point[1] + position[1]
        ]
      }

      // let p2 = [c.massCentroid.getX(), c.massCentroid.getY()];
      // p2 = translatePoint(p2, t);
      // p2 = scalePoint(p2, s);
      // p2 = rotatePoint(p2, r);
      //
      //
      // this.ctx.beginPath();
      // this.ctx.fillStyle = "rgba(0, 0, 255, 0.5)";
      // this.ctx.arc(p2[0], p2[1], 5, 0, 2 * Math.PI);
      // this.ctx.fill();
      // this.ctx.closePath();
    });


	}

}

module.exports = Scene;
