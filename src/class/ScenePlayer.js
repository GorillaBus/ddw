class ScenePlayer {

	constructor(settings) {
		settings = settings || {};
		this.scene = settings.scene;
		this.fps = settings.fps || 60;
		this.playing = false;
		this.requestId = null;
		this.then = 0;
		this.startTime = 0;
		this.fpsInterval = 1000 / this.fps;
		this.frameCount = 0;
		this.framerate = 0;
		this.forward = this.forward.bind(this);
	}

	getFps() {
		return this.framerate;
	}

	play() {
		this.playing = true;
		this.reset();
		this.forward();
	}

	forward(newtime) {
		this.requestId = window.requestAnimationFrame(this.forward);
    const elapsed = newtime - this.then;
    if (elapsed > this.fpsInterval) {
        this.then = newtime - (elapsed % this.fpsInterval);
				// Draw scene
				this.scene.run();
				// Calculate framerate
        const sinceStart = newtime - this.startTime;
        this.framerate = Math.round(1000 / (sinceStart / ++this.frameCount) * 100) / 100;
				// Pass framerate to scene
				this.scene.playerFps = this.framerate;
		}
	}

	stop() {
		if (!this.playing) { return false; }
		window.cancelAnimationFrame(this.requestId);
		this.playing = false;
		this.requestId = null;
	}

	reset() {
		this.then = performance.now();
    this.startTime = this.then;
		this.frameCount = 0;
	}

}

module.exports = ScenePlayer;
