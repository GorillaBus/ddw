const SpatialInteraction = require("./SpatialInteraction");
const Physics = require("./Physics");
const Geometry = require("./Geometry");

class Collision extends SpatialInteraction {

  /**
   * An <i>Interaction</i> type that represents <b>DDW</b>'s main broad-phase collision detection and resolving mechanism. As a <i>SpatialInteraction</i>, collision checks are only done between a current _Body_ and the ones contained by the nearest neighboar cells of a spatial partitioning grid.
   * @summary View file: {@link https://github.com/GorillaBus/ddw/blob/master/src/class/Collision.js https://github.com/GorillaBus/ddw/blob/master/src/class/Collision.js}.
   * @constructor
   * @param {Physics} settings.Physics - A <i>Physics</i> class object.
   * @param {Geometry} settings.Geometry - A <i>Geomery</i> class object.
   */
  constructor(settings) {
    super(settings);
    this.physics = Physics;
    this.geometry = Geometry;
    this.intersector = settings.intersector;
    this.resolver = settings.resolver;
    this.collision = this.collision.bind(this);
  }

  /**
   * Executes the interaction logic.
	 * @method
   */
  run() {
    this.resolve(this.collision);
  }

  /**
   * Verifies the geometrical intersection between two <i>Body</i> objects, based in their bounding circles. In case of a possitive intersection, it will resolve it computing the results of an elastic collision.
   * @param {Body} BodyA - The Body that initiates the interaction.
   * @param {Body} BodyB - The Body that intervenes in with BodyA in the interaction.
   */
  collision(bodyA, bodyB) {
    const intersection = this.geometry.circleCircleIntersection(bodyA.world, bodyB.world);
    if (intersection) {
      this.physics.elasticCollision(bodyA, bodyB, intersection);
    }
  }

}

module.exports = Collision;
