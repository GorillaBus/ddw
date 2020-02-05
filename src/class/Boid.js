const Vector = require("./Vector");
const Mover = require("./Mover");

class Boid extends Mover {
  constructor(world, context, settings) {
    super(world, context, settings);

    this.height = settings.height || 10;
    this.width = settings.width || 7;
    this.maxLength = settings.maxSpeed || 4;
    this.maxSteeringForce = settings.maxSteeringForce || this.maxLength;
    this.maxAheadLength = 150;
  }

  getAhead() {
    const dynamicLength = this.velocity.getLength() / this.maxLength;
    const velocity = this.velocity.copy();
    velocity.normalize();

    const p1 = velocity.multiply(this.maxAheadLength * dynamicLength);
    const p2 = velocity.multiply(this.maxAheadLength * dynamicLength * 0.5);
    const ahead1 = this.location.add(p1);
    const ahead2 = this.location.add(p2);

    this.ctx.beginPath();
    this.ctx.fillStyle = "red";
    this.ctx.arc(ahead1.x, ahead1.y, 5, 0, Math.PI * 2, false);
    this.ctx.fill();
    this.ctx.closePath();

    this.ctx.beginPath();
    this.ctx.fillStyle = "yellow";
    this.ctx.arc(ahead2.x, ahead2.y, 5, 0, Math.PI * 2, false);
    this.ctx.fill();
    this.ctx.closePath();

    return [ ahead1, ahead2 ];
  }

  seek(target) {
    const desired = target.location.substract(this.location);
    desired.normalize();
    desired.multiplyBy(this.maxLength);

    // Steering force
    const steer = desired.substract(this.velocity);
    steer.limit(this.maxSteeringForce);

    return steer;
  }

  avoid(objects) {
    const [ ahead1, ahead2 ] = this.getAhead();
    const nearest = this.watchAhead(objects, ahead1, ahead2);

    if (!nearest) {
      return new Vector({
        x: 0,
        y: 0
      });
    }

    const avoidanceForce = ahead1.substract(nearest.location);
    avoidanceForce.normalize();
    avoidanceForce.multiplyBy(this.maxSteeringForce);





  this.ctx.beginPath();
  this.ctx.strokeStyle = "red";
  this.ctx.moveTo(this.location.getX(), this.location.getY());
  this.ctx.lineTo(avoidanceForce.getX(), avoidanceForce.getY());
  this.ctx.closePath();
  this.ctx.stroke();







    return avoidanceForce;
  }

  watchAhead(objects, ahead1, ahead2) {
    let minDistance = null;
    let nearest = null;
    for (let i=0; i<objects.length; i++) {
      const curr = objects[i];
      const collision = this.aheadIntersectsCircle(curr, ahead1, ahead2);
      if (collision) {
        const dist = curr.location.substract(this.location).getLength();
        if (!minDistance || dist < minDistance) {
          minDistance = dist;
          nearest = curr;
        }
      }
    }
    return nearest;
  }




  aheadIntersectsCircle(obstacle, ahead1, ahead2) {
    const a0 = obstacle.location.substract(this.location).getLength();
    const a1 = obstacle.location.substract(ahead1).getLength();
    const a2 = obstacle.location.substract(ahead2).getLength();
    return a0 <= obstacle.radius || a1 <= obstacle.radius || a2 <= obstacle.radius;
  }


  draw() {
    this.ctx.save();
    this.ctx.translate(this.location.getX(), this.location.getY());
    this.ctx.rotate(this.velocity.getAngle());

    this.ctx.beginPath();
    this.ctx.fillStyle = this.color;
    this.ctx.moveTo(this.height, 0);
    this.ctx.lineTo(-this.height, -this.width);
    this.ctx.lineTo(-this.height, this.width);
    this.ctx.lineTo(this.height, 0);
    this.ctx.fill();
    this.ctx.closePath();

    // Draw thrust
    if (this.thrusting) {
        this.ctx.beginPath();
        this.ctx.moveTo(-10, 0);
        this.ctx.lineTo(-18, 0);
        this.ctx.closePath();
        this.ctx.stroke();
    }

    this.ctx.restore();
  }

}

export default Boid;
