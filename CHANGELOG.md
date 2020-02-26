# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
