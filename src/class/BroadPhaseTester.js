class BroadPhaseTester {

/**
 * An abstract class that provides spatial partitioning for more efficient body interactions in the world, like broad phase collision tests or simplified gravity computation.
 * @summary View file: {@link https://github.com/GorillaBus/ddw/blob/master/src/class/BodyManager.js https://github.com/GorillaBus/ddw/blob/master/src/class/BroadPhaseTester.js}.
 * @abstract 
 * @constructor
 * @param {Object} settings - Json object with construction options
 * @param {Int} [settings.cellSize=128] - Size of the cells in which the world is being partitioned (like a grid).
 */
	constructor(settings) {
		settings = settings || {};
		this.cellSize = settings.cellSize || 128;
		this.cells = [];
	}

	/**
	* Retrieves a partitioning cell by it's id
	* @method
	* @param {String} id - A cell id composed by it's two positional components: "xx_yy".
	* @returns {Object} A json object representing the new cell.
	*/
	getCell(cellId) {
		for (let i = 0, len = this.cells.length; i < len; i++) {
			if (this.cells[i].id === cellId) {
				return this.cells[i];
			}
		}
		return false;
	}

	/**
	* Adds a new cell with the given id
	* @method
	* @param {String} id - A cell id composed by it's two positional components: "xx_yy".
	* @returns {Object} A json object representing the new cell.
	*/
	addCell(id) {
		this.cells.push({
			id,
			bodies: []
		});
		return this.cells[this.cells.length-1];
	}

	/**
	* Empties the cells array deleting all previous registered cell and body data.
	* @method
	*/
	resetGrid() {
		this.cells = [];
	}

	/**
	* Looks for the position of the given body in the grid in which the world has been partitioned, registering the body in the correct cell(s) and creating the cell if it doesn't exist. As an object can overlap with more than one partitioning cell, each point of the body's bounding box is tested. As a result, a body may be registered in more than one cell.
	* @method
	* @param {Body} body - A body object.
	*/
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

	/**
	* Given a point it returns the id of the partitioning cell to which it belongs.
	* @method
	* @param {String} id - A cell id composed by it's two positional components: "xx_yy".
	* @returns {Object} A json object representing the new cell.
	*/
	pointPosition(point) {
		const xComponent = Math.floor(point.x / this.cellSize);
		const yComponent = Math.floor(point.y / this.cellSize);
		return [xComponent, yComponent].join("_");
	}
}

module.exports = BroadPhaseTester;
