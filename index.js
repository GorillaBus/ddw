const Utils = require("./src/class/Utils");
const PolygonGenerator = require("./src/class/PolygonGenerator");
const Model = require("./src/class/Model");
const ModelDrawer = require("./src/class/ModelDrawer");
const Scene = require("./src/class/Scene");
const ScenePlayer = require("./src/class/ScenePlayer");
const Body = require("./src/class/Body");
const Vector = require("./src/class/Vector");
const Viewport = require("./src/class/Viewport");
const SpatialPartitioner = require("./src/class/SpatialPartitioner");
const GlobalInteraction = require("./src/class/GlobalInteraction");
const SpatialInteraction = require("./src/class/SpatialInteraction");
const Collision = require("./src/class/Collision");
const Gravity = require("./src/class/Gravity");
const Physics = require("./src/class/Physics");
const Geometry = require("./src/class/Geometry");

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
	SpatialPartitioner,
	SpatialInteraction,
	GlobalInteraction,
	Collision,
	Gravity,
	Physics,
	Geometry
}
