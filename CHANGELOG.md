# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.2.0] - 2020-03-07

## Added

- Geometry class
- Physics class
- Viewport transitions
- Drawing of Body inner shadows from a light source

# Removed

- Intersector class
- Collision Handler class


## [0.1.2] - 2020-03-05

## Changed

- Webpack now exports DDW as a library
- Viewport movement is now scaled

## Added

- Body class now hadles heading and speed concepts
- Added distnaceTo() method to Body class
- Added mapRange() method to Utils class


## [0.1.1] - 2020-03-02

## Changed

- Viewport scale (aka zoom) now adds/removes a ratio of the current scale


## [0.1.0] - 2020-03-01

## Changed

- General refactor and prunning
- Redefined the general pipeline
- Trimmed unused functionality from Utils
- Model now uses arrays of points instead of Vector objects
- Model don't use Shape objects anymore
- Scene mow handles bodies and interactions
- Refactored interactions system and handling
- SpatialPartitioner: optimized cell search
- SpatialPartitioner: now registers only center points and uses neighbor cells
- ScenePlayer: efficient fps throttle and computation
- Model is now resposible for point transformations
- Viewport is now responsible for View transformations and body-viewport intersection detect
- Viewport does now creates its own model
- Gravity force formula: added G multiplier
- More efficient intersection testing

## Added

- Framerate display
- Debug draw method in Scene
- Drawing of SpatalPartitioner cells (debug)
- ModelDrawer class
- GlobalInteraction: handles the standard N*N complexity interactions
- SpatialInteraction class: interactions with local and neighbors only
- More organized transformations code for View/Camera
- SpatialPartitioner class

## Removed

- Removed many old classes that are not being used yet (Ship, Boid, Console, etc)
- Removed Drawer, BodieManager, BroadPhaseTester, Shape and other classes due to refactor
- Removed coupled transformation code from Model class
- Model preset folder

## Fixed

- Gravity bug: gravity force was not being divided by the body's mass
- Collision detection errors to SpatialPartitioning bugs
- Corrected Viewport transformation


## [0.0.5] - 2020-02-26

### Added

- Interactions schema with broad phase detection grid (spatial partitioning)

## [0.0.4] - 2020-02-10

### Added

- BodyManager to handle bodies within a scene

### Changed

- Decoupled body management logic from Scene class


## [0.0.3] - 2020-02-08

### Added

- CollisionResolver class to handle collision resolution logic
- Intersector class with diferent intersection tests between common shapes

## [0.0.2] - 2020-02-08

### Fixed

- Gravitation formula
- Body.getRadius() now returns the correct value

## [0.0.1] - 2020-02-01

### Added

- Initial code base merging "PhySim", "Collisioner", "Solar Sys", "Boids" projects
