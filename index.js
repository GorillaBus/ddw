const Utils = require("./src/class/Utils");
const PolygonGenerator = require("./src/class/PolygonGenerator");
const Model = require("./src/class/Model");
const ModelDrawer = require("./src/class/ModelDrawer");
const Scene = require("./src/class/Scene");
const ScenePlayer = require("./src/class/ScenePlayer");
const Body = require("./src/class/Body");
const Vector = require("./src/class/Vector");
const Viewport = require("./src/class/Viewport");
const Intersector = require("./src/class/Intersector");
const SpatialPartitioner = require("./src/class/SpatialPartitioner");
const GlobalInteraction = require("./src/class/GlobalInteraction");
const SpatialInteraction = require("./src/class/SpatialInteraction");
const CollisionResolver = require("./src/class/CollisionResolver");
const Collision = require("./src/class/Collision");
const Gravity = require("./src/class/Gravity");

module.exports = {
	Utils,
	PolygonGenerator,
	Model,
	ModelDrawer,
	Scene,
	Body,
	ScenePlayer,
	Vector,
	Viewport,
	Intersector,
	SpatialPartitioner,
	SpatialInteraction,
	GlobalInteraction,
	CollisionResolver,
	Collision,
	Gravity
}
