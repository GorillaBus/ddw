class SpatialPartitioner {

	constructor(settings) {
		settings = settings || {};
		this.cellSize = settings.cellSize || 128;
		this.cells = [];
	}

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

	run() { }

	registerBody(body) {
		const boundingRect = body.getBoundingRect();

		// Find grid positions for each point
    const currentCells = [];
		for (let i=0,len=boundingRect.length; i<len; i++) {
			const point = boundingRect[i];

			// Get point's cell position on the grid
			const cellData = this.pointPosition(point);

      // Find if the cell has already been registered
      let found = false;
      for (let e=0,len=currentCells.length; e<len; e++) {
        if (currentCells[e] === cellData.id) {
          found = true;
          break;
        }
      }
      if (found) continue;

			// Create new cell if required
			let cell = this.getCell(cellData.id);
			if (!cell) {
				cell = this.addCell(cellData);
			}

      // Add body in cell's collection
			cell.bodies.push(body);
      currentCells.push(cellData.id);
		}
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
