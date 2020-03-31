class ScenePlayer {

	constructor(settings) {
		settings = settings || {};
		this.scene = settings.scene;
		this.fps = 0;
		this.maxFPS = settings.maxFPS || 60;
		this.requestId = null;
		this.playing = false;
		this.lastTime = 0;
		this.interval = 1000 / this.maxFPS;
		this.forward = this.forward.bind(this);
		this.scene.playerFps = this.fps;
	}

	getFps() {
		return this.fps;
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
		this.fps = 1 / (delta / 1000);
		this.scene.playerFps = this.fps;
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
