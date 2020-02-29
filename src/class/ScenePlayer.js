class ScenePlayer {

	/**
	* Handles scene playback.
	* @summary View file: {@link https://github.com/GorillaBus/ddw/blob/master/src/class/BodyManager.js https://github.com/GorillaBus/ddw/blob/master/src/class/ScenePlayer.js}.
	* @constructor
	* @param {Object} settings - Json object with construction options.
	* @param {Scene} settings.scene - A scene object.
	* @param {Int} [settings.fps=60] - Maximum frames per second.
	*/
	constructor(settings) {
		settings = settings || {};
		this.scene = settings.scene;
		this.fps = settings.fps || 60;
		this.requestId = null;
		this.playing = false;
		this.lastTime = 0;
		this.interval = 1000 / this.fps;
		this.forward = this.forward.bind(this);;
	}

	/**
	* Start playing the current scene.
	* @method
	*/
	play() {
		this.playing = true;
		this.lastTime = 0;
		this.forward();
	}

	/**
	* A recursive method that calls window.requestAnimationFrame() to draw the next frame.
	* @method
	* @param {Int} timestamp - The elapsed time from the first drawed frame, injected by window.requestAnimationFrame().
	*/
	forward(timestamp) {
		const now = performance.now();
		const delta = now - this.lastTime;
		if (delta > this.interval) {
			this.lastTime = now - (delta % this.interval);
			this.scene.update(now, delta, this.lastTime);
		}
		this.requestId = window.requestAnimationFrame(this.forward);
	}

	/**
	* Stops the scene playback.
	* @method
	*/
	stop() {
		if (!this.playing) { return false; }
		window.cancelAnimationFrame(this.requestId);
		this.playing = false;
		this.requestId = null;
	}
}

module.exports = ScenePlayer;
