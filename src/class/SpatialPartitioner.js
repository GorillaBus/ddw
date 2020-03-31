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
