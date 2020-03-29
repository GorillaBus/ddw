class SpatialPartitioner {

	constructor(settings) {
		settings = settings || {};
		this.cellSize = settings.cellSize || 128;
		this.cells = [];
	}

  run() { }

	getCell(cellId) {
		for (let i=0,len=this.cells.length; i<len; i++) {
			if (this.cells[i].id === cellId) {
				return this.cells[i];
			}
		}
		return false;
	}

	getCells() {
		return this.cells;
	}

  getNeighborCells(cell) {
    const neighborCells = [];
    const neighborIds = [
      [cell.x - 1, cell.y - 1].join("_"),
      [cell.x, cell.y - 1].join("_"),
      [cell.x + 1, cell.y - 1].join("_"),
      [cell.x + 1, cell.y].join("_"),
      [cell.x + 1, cell.y + 1].join("_"),
      [cell.x, cell.y + 1].join("_"),
      [cell.x - 1, cell.y + 1].join("_"),
      [cell.x - 1, cell.y].join("_")
    ];
    for (let i=0; i<8; i++) {
      const id = neighborIds[i];
      const neighbor = this.getCell(id);
      if (neighbor) {
        neighborCells.push(neighbor);
      }
    }
    return neighborCells;
  }

	addCell(cellData) {
    const cell = {
			...cellData,
			bodies: []
		};
		this.cells.push(cell);
		return cell;
	}

	resetGrid() {
		this.cells = [];
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
