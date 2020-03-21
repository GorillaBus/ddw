class ScenePlayer {

	constructor(settings) {
		settings = settings || {};
		this.scene = settings.scene;
		this.fps = settings.fps || 60;
		this.requestId = null;
		this.playing = false;
		this.lastTime = 0;
		this.interval = 1000 / this.fps;
		this.forward = this.forward.bind(this);
	}

	play() {
		this.playing = true;
		this.lastTime = 0;
		this.forward();
	}

	forward(timestamp) {
		const now = performance.now();
		const delta = now - this.lastTime;
		if (delta > this.interval) {
			this.lastTime = now - (delta % this.interval);
			this.scene.run(now, delta, this.lastTime);
		}
		this.requestId = window.requestAnimationFrame(this.forward);
	}

	stop() {
		if (!this.playing) { return false; }
		window.cancelAnimationFrame(this.requestId);
		this.playing = false;
		this.requestId = null;
	}

}

module.exports = ScenePlayer;
