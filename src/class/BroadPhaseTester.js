class BroadPhaseTester {
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

	addCell(cellId) {
		this.cells.push({
			id: cellId,
			bodies: []
		});
		return this.cells[this.cells.length-1];
	}

	resetGrid() {
		this.cells = [];
	}

	registerBody(body) {
		const boundingBox = body.getBoundingBox();

		// Find grid positions for each point
		for (let i=0,len=boundingBox.points.length; i<len; i++) {
			const point = boundingBox.points[i];

			// Get point's cell position on the grid
			const cellId = this.pointPosition(point);

			// Create new cell if required
			let cell = this.getCell(cellId);
			if (!cell) {
				cell = this.addCell(cellId);
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
		const xComponent = Math.floor(point.x / this.cellSize);
		const yComponent = Math.floor(point.y / this.cellSize);
		return [xComponent, yComponent].join("_");
	}
}

module.exports = BroadPhaseTester;
