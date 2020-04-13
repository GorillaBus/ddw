const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;
const GLOBAL_SCALE = 50;
const PLAYER_FPS = 60;
const TRANSITION_STEPS = 250;
const ZOOM_SENS = 0.005;
const DEBUG_MODE = false;

window.onload = () => {
  init();
};


/* Orchestration */
const init = async () => {

  /* Initialize HTML Canvas */
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext("2d");
  canvas.width = SCREEN_WIDTH;
  canvas.height = SCREEN_HEIGHT;


  // Solar system setup
  const solarSys = new Planetario();

  solarSys.addStar({
    mass: 1000000,
    fillColor: "rgba(241, 184, 45, 1)",
    brightnessColor: "rgba(255, 255, 255, 0.07)",
    innerLightColor: "rgba(255, 255, 255, 0.4)",
    filter: "blur(0.25px)",
    lightRadius: 40
  });

  solarSys.addRecursiveObrbits(5);

  const bodies = solarSys.getBodies();


  /*
    Create the main objects to build the scene, add bodies with interactions, set a viewport to
    observe the world and a player to run the scene.
  */

	const viewport = new ddw.Viewport({
		width: SCREEN_WIDTH,
		height: SCREEN_HEIGHT,
		intersector: ddw.Intersector,
    scale: GLOBAL_SCALE
	});
	const drawer = new ddw.ModelDrawer();
	const collisions = new ddw.Collision({
		cellSize: solarSys.star.mass,
		intersector: ddw.Intersector,
		resolver: ddw.CollisionResolver,
		debug: true
	});
  const gravity = new ddw.Gravity({});
	const scene = new ddw.Scene({
    debug: DEBUG_MODE,
		width: SCREEN_WIDTH,
		height: SCREEN_HEIGHT,
    lightSource: bodies[0],
		bodies,
    ctx,
    drawer,
    viewport,
		globalInteractions: [ gravity ],
    spatialInteractions: [ collisions ]
	});

	const player = new ddw.ScenePlayer({
		scene,
    fps: PLAYER_FPS
	});

  // Initial position for mouse drags
  let mouseStart = new ddw.Vector({
		x: 0,
		y: 0
	});

  // Start playing the scene
  player.play();


  /* Handle events */

  // Handle keydowns
	document.body.addEventListener("keydown", (e) => { handleKeydown(e, player, scene); });

  // Handle mouse wheel
	window.addEventListener("wheel", event => {
	    const delta = Math.sign(event.deltaY);
	    if (delta > 0) {
				viewport.scaleUp(ZOOM_SENS);
			} else {
				viewport.scaleDown(ZOOM_SENS);
			}
	});

  // Handle "Cool, let me play with it!" button
  document.getElementById("btnOk").onclick = (e) => {
    document.getElementById("welcomeModal").style= "display: none";
  };

  // Handle mouse events
	window.addEventListener("mousedown", event => {
		mouseStart.setX(event.clientX);
		mouseStart.setY(event.clientY);
		window.addEventListener("mousemove", handleMouseMove);
	});
	window.addEventListener("touchstart", event => {
		mouseStart.setX(event.clientX);
		mouseStart.setY(event.clientY);
		window.addEventListener("mousemove", handleMouseMove);
	});
	window.addEventListener("mouseup", event => {
		viewport.resetVelocity();
		window.removeEventListener("mousemove", handleMouseMove);
	});


  // Handle mouse move
	function handleMouseMove(event) {
		const mouse = new ddw.Vector({
			x: event.clientX,
			y: event.clientY
		});
		const dir = mouse.substract(mouseStart);
		dir.multiplyBy(0.2);
		viewport.applyForce(dir);
	}

	// Handle events
	function handleKeydown(e, player, scene) {
		// console.log("Key pressed: ", e.keyCode);

		switch (e.keyCode) {

  		case 13:
  		e.preventDefault();
  		player.stop();
  		player.play();
  		player.stop();
  		console.log("> Step forward");
  		break;

			case 27: // Esc
			if (player.playing) {
				player.stop();
				console.log("> Scene stopped");
			} else {
				player.play();
				console.log("> Playing scene");
			}
			break;

			case 37:
			e.preventDefault();
			viewport.move(-50, 0);
			break;

      case 39:
			e.preventDefault();
			viewport.move(50, 0);
			break;

			case 38:
			e.preventDefault();
			viewport.move(0, -50);
			break;

      case 40:
			e.preventDefault();
			viewport.move(0, 50);
			break;

      case 49:
      e.preventDefault();
      viewport.transitionTo(scene.bodies[0], TRANSITION_STEPS, 50, () => {
          viewport.attachTo(scene.bodies[0]);
      });
      break;

      case 50:
      e.preventDefault();
      viewport.transitionTo(scene.bodies[1], TRANSITION_STEPS, 16, () => {
          viewport.attachTo(scene.bodies[1]);
      });
      break;

      case 51:
      e.preventDefault();
      viewport.transitionTo(null, 100, 80, () => {
          viewport.transitionTo(scene.bodies[2], TRANSITION_STEPS, 28, () => {
            viewport.attachTo(scene.bodies[2]);
          });
      });
      break;

      case 52:
      e.preventDefault();
      viewport.transitionTo(null, 100, 150, () => {
          viewport.transitionTo(scene.bodies[3], TRANSITION_STEPS, 3, () => {
            viewport.attachTo(scene.bodies[3]);
          });
      });
      break;

      case 53:
      e.preventDefault();
      viewport.transitionTo(null, 150, 400, () => {
          viewport.transitionTo(scene.bodies[4], TRANSITION_STEPS, 15, () => {
            viewport.attachTo(scene.bodies[4]);
          });
      });
      break;

      case 54:
      e.preventDefault();
      viewport.transitionTo(null, 150, 1050, () => {
          viewport.transitionTo(scene.bodies[5], TRANSITION_STEPS, 15, () => {
            viewport.attachTo(scene.bodies[5]);
          });
      });
      break;

			case 69:
			e.preventDefault();
			viewport.rotateRight();
			break;

			case 81:
			e.preventDefault();
			viewport.rotateLeft();
			break;

			case 171:
			e.preventDefault();
			viewport.scaleDown(ZOOM_SENS);
			break;

      case 173:
      e.preventDefault();
      viewport.scaleUp(ZOOM_SENS);
      break;

			case 187:
			e.preventDefault();
			viewport.scaleDown(ZOOM_SENS);
			break;

			case 219:
			e.preventDefault();
			viewport.scaleUp(ZOOM_SENS);
			break;

			default:
			break;
		}
	}

}
