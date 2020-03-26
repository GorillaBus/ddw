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
		for (let i=0,len=boundingRect.length; i<len; i++) {
			const point = boundingRect[i];

			// Get point's cell position on the grid
			const cellData = this.pointPosition(point);

			// Create new cell if required
			let cell = this.getCell(cellData.id);
			if (!cell) {
				cell = this.addCell(cellData);
			}

			// Add body to cell's collection
			let bodiesLen = cell.bodies.length;
			if (bodiesLen === 0) {
				cell.bodies.push(body);
				continue;
			}

			let bodyExistsInCollection = false;
			for (let y=0; y<bodiesLen; y++) {
				if (cell.bodies[y].uuid === body.uuid) {
					bodyExistsInCollection = true;
					break;
				}
			}

			if (!bodyExistsInCollection) {
				cell.bodies.push(body);
			}
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
