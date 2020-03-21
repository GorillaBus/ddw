class Model {

	constructor(settings) {
    this.points = settings.points || [];
		this.strokeColor = settings.strokeColor || "#94ec5d";
    this.fillColor = settings.fillColor || "#fcfcfc";
	}

  getPoints() {
    return this.points;
  }
}

module.exports = Model;
