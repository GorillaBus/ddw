# DDW

*This is still the project of unifying code from many computer graphics and physics simulation projects from the last few years in one unique project... and it's still work in progress.*

**DDW** is a 2D graphics and physics library meant to be used in the browser but also in Node, in a way that computing simulations and drawing the world can happen in sepparated process or systems, through the local system or a network socket or API.

Documentation is being developed and should be available during the next few days. Also a description of the pipeline process. Note that the current documentation files and wiki is outdated because of a recent refactor.

An implementation demo can be found in the /demos. An NPM package of the library is also on its way.

Feel free to throw a hand if you know how to improve the architecture, physics computation, optmize or add features.


### Use it

1. You can install the npm package with: `npm install ddw`
2. Require ir from NodeJS or load it from the browser


### Develop it

If you would like to develop:
1. Clone the repo
2. Install dependencies `npm install`
3. Run webpack with watch option: `npm run dev`
4. Build the distribution package: `npm run build`
6. Use the `dist/ddw.js` minified file in production


### Live demo

Check the "Planetario" DDW demo at: https://cdn.statically.io/gh/GorillaBus/ddw/8f1cc549/demos/planetario/index.html
