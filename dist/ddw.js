!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.ddw=e():t.ddw=e()}("undefined"!=typeof self?self:this,(function(){return function(t){var e={};function i(s){if(e[s])return e[s].exports;var n=e[s]={i:s,l:!1,exports:{}};return t[s].call(n.exports,n,n.exports,i),n.l=!0,n.exports}return i.m=t,i.c=e,i.d=function(t,e,s){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(i.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)i.d(s,n,function(e){return t[e]}.bind(null,n));return s},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=9)}([function(t,e){class i{constructor(t){(t=t||{}).x=t.x||0,t.y=t.y||0,t.length=t.length||0,t.angle=t.angle||0,this.x=t.x,this.y=t.y,t.length&&this.setLength(t.length),t.angle&&this.setAngle(t.angle)}setX(t){this.x=t}getX(){return this.x}setY(t){this.y=t}getY(){return this.y}setAngle(t){let e=this.getLength();this.x=Math.cos(t)*e,this.y=Math.sin(t)*e}getAngle(){return Math.atan2(this.getY(),this.getX())}setLength(t){let e=this.getAngle();this.x=Math.cos(e)*t,this.y=Math.sin(e)*t}getLength(){return Math.sqrt(this.x*this.x+this.y*this.y)}hasLength(){return 0!==this.x||0!==this.y}rotateBy(t){const e=this.getX(),i=this.getY();this.x=e*Math.cos(t)-i*Math.sin(t),this.y=e*Math.sin(t)+i*Math.cos(t)}add(t){return new i({x:this.x+t.getX(),y:this.y+t.getY()})}substract(t){return new i({x:this.x-t.getX(),y:this.y-t.getY()})}multiply(t){return new i({x:this.x*t,y:this.y*t})}divide(t){return new i({x:this.x/t,y:this.y/t})}addTo(t){this.x+=t.getX(),this.y+=t.getY()}substractFrom(t){this.x-=t.getX(),this.y-=t.getY()}multiplyBy(t){this.x*=t,this.y*=t}divideBy(t){this.x/=t,this.y/=t}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}perpDot(t){const e=this.substract(t).cross(t)/this.cross(t);return new i({x:this.getX()+t.getX()*e,y:this.getY()+t.getY()*e})}perpTo(t){const e=this.substract(t);return e.normalize(),[new ddw.Vector({x:e.getY(),y:-e.getX(),length:1}),new ddw.Vector({x:-e.getY(),y:e.getX(),length:1})]}project(t){const e=vector.dot(vector);if(e>0){const t=this.dot(vector)/e,i=vector.copy();return i.multiplyBy(t),i}return new i}angleBetween(t){let e=this.copy(),i=t.copy();e.normalize(),i.normalize();let s=e.dot(i),n=Math.acos(s);return isNaN(n)&&console.warn("Theta is 'NaN' on Vector.angleBetween()"),n}angleDirection(t){let e=this.cross(t);return e>0?1:e<0?-1:0}angleDifference(t){return this.angleBetween(t)*this.angleDirection(t)}copy(){return new i({x:this.getX(),y:this.getY()})}normalize(){var t=this.getLength();0!=t&&this.divideBy(t)}dist(t){return t.substract(this).getLength()}limit(t){this.getLength()>t&&this.setLength(t)}reset(){this.x=0,this.y=0}}t.exports=i},function(t,e){const i=new class{uniqueID(){function t(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)}return t()+t()+"-"+t()+"-"+t()+"-"+t()+"-"+t()+t()+t()}randomRange(t,e){return t+Math.random()*(e-t)}mapRange(t,e,i,s,n){return s+(n-s)*(t-e)/(i-e)}randomAngle(){return this.randomRange(-Math.PI,Math.PI)}componentToHex(t){var e=t.toString(16);return 1==e.length?"0"+e:e}rgbToHex(t,e,i){return"#"+componentToHex(t)+componentToHex(e)+componentToHex(i)}hexToRgb(t){var e=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);return e?{r:parseInt(e[1],16),g:parseInt(e[2],16),b:parseInt(e[3],16)}:null}randomColor(){return"#000000".replace(/0/g,(function(){return(~~(16*Math.random())).toString(16)}))}};t.exports=i},function(t,e){t.exports=class{constructor(t){this.points=t.points||[],this.strokeColor=t.strokeColor||null,this.fillColor=t.fillColor||null,this.fillGradient=t.fillGradient||null,this.filter=t.filter||null,this.bounds=this.getBounds(),this.center=this.getCenter(),this.width=this.bounds.xMax-this.bounds.xMin,this.height=this.bounds.yMax-this.bounds.yMin,this.radius=Math.max(this.width,this.height)/2,this.children=t.children||[]}getPoints(){return this.points}getBounds(){const t=[],e=[];for(let i=0,s=this.points.length;i<s;i++){const s=this.points[i];t.push(s[0]),e.push(s[1])}return{xMin:Math.min.apply(null,t),xMax:Math.max.apply(null,t),yMin:Math.min.apply(null,e),yMax:Math.max.apply(null,e)}}getCenter(){return[(this.bounds.xMin+this.bounds.xMax)/2,(this.bounds.yMin+this.bounds.yMax)/2]}transform(t,e,i){i=i||[0,0];const s=[];for(let n=0,r=this.points.length;n<r;n++){let r=this.points[n];null!==t&&(r=this.rotatePoint(r,t)),null!==e&&(r=this.scalePoint(r,e)),null!==i&&(r=this.translatePoint(r,i)),s.push(r)}return new this.constructor({points:s,strokeColor:this.strokeColor,fillColor:this.fillColor,fillGradient:this.fillGradient,filter:this.filter,children:this.children.map(s=>s.transform(t,e,i))})}transformInversion(t,e,i){const s=[];for(let n=0,r=this.points.length;n<r;n++){let r=this.points[n];null!==t&&(r=this.translatePoint(r,t)),null!==e&&(r=this.scalePoint(r,e)),null!==i&&(r=this.rotatePoint(r,i)),s.push(r)}return new this.constructor({points:s,strokeColor:this.strokeColor,fillColor:this.fillColor,fillGradient:this.fillGradient,filter:this.filter,children:this.children.map(s=>s.transformInversion(t,e,i))})}rotatePoint(t,e){return[t[0]*Math.cos(e)-t[1]*Math.sin(e),t[0]*Math.sin(e)+t[1]*Math.cos(e)]}scalePoint(t,e){return[t[0]*e,t[1]*e]}translatePoint(t,e){return[t[0]+e[0],t[1]+e[1]]}}},function(t,e){t.exports=new class{rectangleRectangleIntersection(t,e){return this.rangeIntersect(t.bounds.xMin,t.bounds.xMin+t.width,e.bounds.xMin,e.bounds.xMin+e.width)&&this.rangeIntersect(t.bounds.yMin,t.bounds.yMin+t.height,e.bounds.yMin,e.bounds.yMin+e.height)}circleRectangleIntersection(t,e){const i=Math.abs(t.center[0]-e.bounds.xMin-e.width/2),s=Math.abs(t.center[1]-e.bounds.yMin-e.height/2);if(i>e.width/2+t.radius||s>e.height/2+t.radius)return!1;if(i<=e.width/2||s<=e.height/2)return!0;const n=i-e.width/2,r=s-e.height/2;return n*n+r*r<=t.radius*t.radius}circleCircleIntersection(t,e){const i=t.center[0]-e.center[0],s=t.center[1]-e.center[1],n=i*i+s*s;return n<(t.radius+e.radius)*(t.radius+e.radius)&&{x:i,y:s,dist_squared:n}}rangeIntersect(t,e,i,s){return Math.max(t,e)>=Math.min(i,s)&&Math.min(t,e)<=Math.max(i,s)}}},function(t,e,i){const s=i(0);t.exports=new class{constructor(t){t=t||{},this.G=t.G||9.8}gravity(t,e){const i=e.location.substract(t.location),s=i.getLength();if(e.getRadius()+t.getRadius()>s)return;const n=this.G*(t.mass*e.mass/(s*s));i.normalize(),i.multiplyBy(n),t.applyForce(i)}elasticCollision(t,e,i){const n=e.velocity.getX()-t.velocity.getX(),r=e.velocity.getY()-t.velocity.getY(),o=i.x*n+i.y*r;if(o>0){const n=o/i.dist_squared,r={x:i.x*n,y:i.y*n},l=t.density+e.density,h=(t.density,e.density,t.mass+e.mass),a=2*e.mass/h*.1,c=2*t.mass/h*.25,d=new s({x:a*r.x,y:a*r.y}),u=new s({x:c*r.x,y:c*r.y}).multiply(-1);t.applyNetForce(d),e.applyNetForce(u)}}orbitDistanceBySpeed(t,e,i){return t.mass*e.mass/i}orbitSpeedByDistance(t,e,i){i=i||9.8;const s=t.distanceTo(e);return Math.sqrt(i*e.mass/s)}}},function(t,e,i){const s=i(0),n=i(1);t.exports=class{constructor(t){(t=t||{}).x=t.x||0,t.y=t.y||0,t.speed=t.speed||0,t.heading=t.heading||0,this.angleAcceleration=0,this.angleVelocity=t.angleVelocity||0,this.angle=t.angle||0,this.acceleration=new s({x:0,y:0}),this.velocity=new s({length:t.speed,angle:t.heading}),this.location=new s({x:t.x,y:t.y}),this.mass=t.mass||1,this.scale=t.scale||1,this.uuid=n.uniqueID(),this.model=t.model,this.world=this.getWorldTransform()}getAngle(){return this.angle}getScale(){return this.scale}getHeading(){return this.velocity.getAngle()}setHeading(t){this.velocity.setAngle(t)}getSpeed(){return this.velocity.getLength()}setSpeed(t){this.velocity.setLength(t)}getLocation(){return this.location}getBoundingRect(){return[[this.world.bounds.xMin,this.world.bounds.yMin],[this.world.bounds.xMin,this.world.bounds.yMax],[this.world.bounds.xMax,this.world.bounds.yMax],[this.world.bounds.xMax,this.world.bounds.yMin]]}update(){this.velocity.addTo(this.acceleration),this.location.addTo(this.velocity),this.acceleration.multiplyBy(0),this.angleVelocity+=this.angleAcceleration,this.angle+=this.angleVelocity,this.angleAcceleration=0,this.world=this.getWorldTransform()}getWorldTransform(){return this.model.transform(this.angle,this.scale,[this.location.getX(),this.location.getY()])}getRadius(){return this.world.radius}setPosition(t){this.location=t}applyForce(t){let e=t.divide(this.mass);this.acceleration.addTo(e)}applyNetForce(t){this.acceleration.addTo(t)}resetVelocity(){this.velocity.multiplyBy(0)}distanceTo(t){return t.location.substract(this.location).getLength()-this.getRadius()-t.getRadius()}}},function(t,e){t.exports=class{constructor(t){t=t||{},this.cellSize=t.cellSize||128,this.neighborRange=t.neighborRange||1,this.cells=[],this.cellIndex={},this.debug=t.debug||!1}run(){}getCell(t){if(this.cellIndex[t])return this.cellIndex[t]}getCells(){return this.cells}getNeighborCells(t){const e=[],i=this.getNeighborCellIds(t.x,t.y);for(let t=0,s=i.length;t<s;t++){const s=i[t],n=this.getCell(s);n&&e.push(n)}return e}getNeighborCellIds(t,e){return[[t-1,e-1].join("_"),[t,e-1].join("_"),[t+1,e-1].join("_"),[t+1,e].join("_"),[t+1,e+1].join("_"),[t,e+1].join("_"),[t-1,e+1].join("_"),[t-1,e].join("_")]}addCell(t){const e={...t,bodies:[]};return this.cells.push(e),this.cellIndex[t.id]=e,e}resetGrid(){this.cells=[],this.cellIndex={}}registerBody(t,e){const i=t.world.getCenter(),s=this.pointPosition(i);let n=this.getCell(s.id);n||(n=this.addCell(s)),n.bodies.push(t)}pointPosition(t){const e=Math.floor(t[0]/this.cellSize),i=Math.floor(t[1]/this.cellSize);return{x:e,y:i,id:[e,i].join("_")}}}},function(t,e){t.exports=class{run(){}resolve(t,e){for(let i=0,s=t.length;i<s;i++){const s=t[i];for(let i=0,n=t.length;i<n;i++){const n=t[i];s.uuid!==n.uuid&&e(s,n)}}}}},function(t,e,i){const s=i(6);t.exports=class extends s{run(){}resolve(t,e){e=e||t;for(let i=0,s=this.cells.length;i<s;i++){const s=this.cells[i],n=this.getNeighborCells(s);for(let i=0,r=s.bodies.length;i<r;i++){const r=s.bodies[i];for(let e=0,i=s.bodies.length;e<i;e++){const i=s.bodies[e];r.uuid!==i.uuid&&t(r,i)}for(let t=0,i=n.length;t<i;t++){const i=n[t];for(let t=0,s=i.bodies.length;t<s;t++){e(r,i.bodies[t])}}}}}}},function(t,e,i){const s=i(1),n=i(10),r=i(2),o=i(11),l=i(12),h=i(13),a=i(5),c=i(0),d=i(14),u=i(6),g=i(7),p=i(8),y=i(15),f=i(16),x=i(4),w=i(3);t.exports={Utils:s,PolygonGenerator:n,Model:r,ModelDrawer:o,Scene:l,Body:a,ScenePlayer:h,Vector:c,Viewport:d,SpatialPartitioner:u,SpatialInteraction:p,GlobalInteraction:g,Collision:y,Gravity:f,Physics:x,Geometry:w}},function(t,e){t.exports=new class{circle(t){const e=t.divs||32,i=t.radius||1,s=2*Math.PI/t.divs,n=[];for(let t=0;t<e;t++){const e=[Math.cos(s*t+1)*i,Math.sin(s*t+1)*i];n.push(e)}return n}}},function(t,e,i){const s=i(0);t.exports=class{drawModel(t,e){const i=t.getPoints();t.filter&&(e.save(),e.filter=t.filter),e.beginPath();for(let t=0,s=i.length;t<s;t++){const n=i[t],r=t===s-1?i[0]:i[t+1];0===t&&e.moveTo(n[0],n[1]),e.lineTo(r[0],r[1])}e.closePath(),t.strokeColor&&(e.strokeStyle=t.strokeColor,e.stroke()),t.fillColor&&(e.fillStyle=t.fillColor,e.fill()),t.fillGradient&&(e.fillStyle=this.createRadialGradient(t,e),e.fill()),t.filter&&e.restore(),t.children.map(t=>this.drawModel(t,e))}drawBoundingRectangle(t,e){e.beginPath(),e.strokeStyle="yellow",e.strokeRect(t.bounds.xMin,t.bounds.yMin,t.width,t.height),e.closePath()}drawBoundingCircle(t,e){e.beginPath(),e.strokeStyle="yellow",e.arc(t.center[0],t.center[1],t.radius,0,2*Math.PI),e.stroke(),e.closePath()}drawInnerShadow(t,e,i,n,r,o){if(t.radius<1)return;n=n||6,r=r||.92,o=o||.94;const l=t.radius*n,h=new s({x:t.center[0]-e.center[0],y:t.center[1]-e.center[1]});h.normalize(),h.multiplyBy(l*r),h.x+=t.center[0],h.y+=t.center[1],i.save();let a=new Path2D;a.arc(t.center[0],t.center[1],t.radius+1,0,2*Math.PI,!0),i.clip(a);const c=i.createRadialGradient(h.getX(),h.getY(),l*o,h.getX(),h.getY(),l);c.addColorStop(0,"rgba(0, 0, 0, 0.9)"),c.addColorStop(1,"rgba(0, 0, 0, 0.001)"),i.beginPath(),i.fillStyle=c,i.arc(h.getX(),h.getY(),l,0,2*Math.PI,!0),i.fill(),i.closePath(),i.restore()}createRadialGradient(t,e){const i=e.createRadialGradient(t.center[0],t.center[1],0,t.center[0],t.center[1],t.radius);return i.addColorStop(0,t.fillGradient.stop1),i.addColorStop(1,t.fillGradient.stop2),i}}},function(t,e,i){const s=i(2);t.exports=class{constructor(t){t=t||{},this.bodies=t.bodies||[],this.width=t.width||800,this.height=t.height||600,this.lightSource=t.lightSource||null,this.viewport=t.viewport,this.drawer=t.drawer,this.ctx=t.ctx,this.spatialInteractions=t.spatialInteractions||[],this.globalInteractions=t.globalInteractions||[],this.playerFps=0,this.debug=t.debug||!1,this.init()}init(){this.boundries=[{x:-this.width/2,y:-this.height/2},{x:this.width/2,y:-this.height/2},{x:this.width/2,y:this.height/2},{x:-this.width/2,y:this.height/2}],this.ctx.translate(this.width/2,this.height/2),this.run=this.run.bind(this)}run(){this.ctx.clearRect(this.boundries[0].x,this.boundries[0].y,this.width,this.height),this.update(),this.runSpatialInteractions(),this.runGlobalInteractions(),this.debug&&this.debugDraw(),this.draw()}update(){this.viewport.update(),this.resetSpatialInteractions();for(let t=0,e=this.bodies.length;t<e;t++){const e=this.bodies[t];e.update(),this.spatialRegister(e)}}draw(){const t=this.lightSource?this.viewport.getRelativeView(this.lightSource):null;for(let e=0,i=this.bodies.length;e<i;e++){const i=this.bodies[e];if(this.viewport.intersects(i)){const e=this.viewport.getRelativeView(i);this.drawer.drawModel(e,this.ctx),i.drawShadow&&this.lightSource&&this.lightSource.uuid!==i.uuid&&this.drawer.drawInnerShadow(e,t,this.ctx)}}this.printText("FPS: "+this.playerFps)}debugDraw(){this.spatialInteractions.forEach(t=>{t.debug&&this.drawSpatialGrid(t)})}runGlobalInteractions(){for(let t=0,e=this.globalInteractions.length;t<e;t++)this.globalInteractions[t].run(this.bodies)}runSpatialInteractions(){for(let t=0,e=this.spatialInteractions.length;t<e;t++)this.spatialInteractions[t].run()}resetSpatialInteractions(){for(let t=0,e=this.spatialInteractions.length;t<e;t++)this.spatialInteractions[t].resetGrid()}spatialRegister(t){for(let e=0,i=this.spatialInteractions.length;e<i;e++)this.spatialInteractions[e].registerBody(t)}drawSpatialGrid(t){const e=t.getCells(),i=t.cellSize;e.forEach(e=>{const n=i*t.neighborRange,r=new s({points:[[e.x*i,e.y*i],[e.x*i+i,e.y*i],[e.x*i+i,e.y*i+i],[e.x*i,e.y*i+i]],strokeColor:"rgba(0, 255, 0, 0.6)"}),o=new s({points:[[e.x*i-n,e.y*i-n],[e.x*i+i+n,e.y*i-n],[e.x*i+i+n,e.y*i+i+n],[e.x*i-n,e.y*i+i+n]],strokeColor:"rgba(55, 20, 0, 0.6)"}),l=this.viewport.getRelativeView({getScale:()=>1,world:r}),h=this.viewport.getRelativeView({getScale:()=>1,world:o});this.drawer.drawModel(l,this.ctx),this.drawer.drawModel(h,this.ctx)})}printText(t,e,i){e=e||this.boundries[0].x,i=i||this.boundries[0].y+20,this.ctx.font="16px Arial",this.ctx.fillStyle="red",this.ctx.fillText(t,e,i)}}},function(t,e){t.exports=class{constructor(t){t=t||{},this.scene=t.scene,this.fps=t.fps||60,this.playing=!1,this.requestId=null,this.then=0,this.startTime=0,this.fpsInterval=1e3/this.fps,this.frameCount=0,this.framerate=0,this.forward=this.forward.bind(this)}getFps(){return this.framerate}play(){this.playing=!0,this.reset(),this.forward()}forward(t){this.requestId=window.requestAnimationFrame(this.forward);const e=t-this.then;if(e>this.fpsInterval){this.then=t-e%this.fpsInterval,this.scene.run();const i=t-this.startTime;this.framerate=Math.round(1e3/(i/++this.frameCount)*100)/100,this.scene.playerFps=this.framerate}}stop(){if(!this.playing)return!1;window.cancelAnimationFrame(this.requestId),this.playing=!1,this.requestId=null}reset(){this.then=performance.now(),this.startTime=this.then,this.frameCount=0}}},function(t,e,i){const s=i(5),n=i(2),r=(i(1),i(3));t.exports=class extends s{constructor(t){super({angle:t.angle||0,scale:t.scale||1,model:new n({points:[[-t.width/2,-t.height/2],[-t.width/2,t.height/2],[t.width/2,t.height/2],[t.width/2,-t.height/2]]})}),this.geometry=r,this.width=t.width||800,this.height=t.height||600,this.attached=t.attachTo||!1,this.transitions=[]}update(){this.attached?(this.location.x=this.attached.location.getX(),this.location.y=this.attached.location.getY()):(this.velocity.addTo(this.acceleration),this.location.addTo(this.velocity),this.acceleration.multiplyBy(0),this.angleVelocity+=this.angleAcceleration,this.angle+=this.angleVelocity,this.angleAcceleration=0),this.world=this.getWorldTransform(),this.runTransitions()}intersects(t){const e=this.geometry.rectangleRectangleIntersection(t.world,this.world);if(e)return e;if(t.world.children.length>0)for(let e=0,i=t.world.children.length;e<i;e++){const i=t.world.children[e],s=this.geometry.rectangleRectangleIntersection(i,this.world);if(s)return s}return!1}attachTo(t){this.attached=t}detach(){this.attached=null}addTransition(t){this.detach(),this.transitions.push(t)}runTransitions(){for(let t=0;t<this.transitions.length;t++){const e=this.transitions[t];if(0!==e.steps){if(e.translate){const t=e.translate.location.add(e.translate.velocity).substract(this.location),i=t.getLength()/e.steps;t.normalize(),t.multiplyBy(i),this.location.addTo(t)}if(e.scale){const t=(e.scale-this.scale)/e.steps;this.scale+=t}e.steps--}else"function"==typeof e.end&&e.end(),this.transitions.splice(t,1)}}transitionTo(t,e,i,s){const n={steps:e=e||100,translate:t=t||null,scale:i=i||2,end:s=s||null};this.addTransition(n)}getRelativeView(t){const e=this.attached?this.attached.location:this.location,i=[-1*e.getX(),-1*e.getY()],s=-1*this.getAngle(),n=t.getScale()/this.getScale();return t.world.transformInversion(i,n,s)}rotateLeft(t){t=t||.01,this.angle-=t}rotateRight(t){t=t||.01,this.angle+=t}scaleUp(t){t=t||.1,this.scale+=this.scale*t,this.scale+=this.scale*t}scaleDown(t){t=t||.1,this.scale-=this.scale*t,this.scale-=this.scale*t}move(t,e){this.attached||(this.location.setX(this.location.getX()+t*this.scale),this.location.setY(this.location.getY()+e*this.scale))}}},function(t,e,i){const s=i(8),n=i(4),r=i(3);t.exports=class extends s{constructor(t){super(t),this.physics=n,this.geometry=r,this.intersector=t.intersector,this.resolver=t.resolver,this.collision=this.collision.bind(this)}run(){this.resolve(this.collision)}collision(t,e){const i=this.geometry.circleCircleIntersection(t.world,e.world);i&&this.physics.elasticCollision(t,e,i)}}},function(t,e,i){const s=i(7),n=i(4);t.exports=class extends s{constructor(t){super(t),this.physics=n,this.gravitate=this.gravitate.bind(this)}run(t){this.resolve(t,this.gravitate)}gravitate(t,e){this.physics.gravity(t,e)}}}])}));
//# sourceMappingURL=ddw.js.map