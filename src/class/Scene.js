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
    for (let i=0, len=this.bodies.length; i<len; i++) {
      const body = this.bodies[i];
      if (this.viewport.intersects(body)) {
        const perspectiveView = this.viewport.getRelativeView(body);
        this.drawer.drawModel(perspectiveView, this.ctx);
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
