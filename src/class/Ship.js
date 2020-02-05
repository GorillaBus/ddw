const Utils = require('./Utils');
const Vector = require('./Vector');
const Body = require('./Body');

class Ship extends Body {
  constructor(settings) {
    super(settings);

    // Rotor
    this.angle = settings.angle || Math.PI;
    this.maxRotorSpeed = settings.maxRotorSpeed || 0.1;
    this.angularVelocity = 0;
    this.angularAcceleration = 0;

    // Thrusters
    this.maxThrustPower = settings.maxThrustPower || 0.01;
    this.thruster = new Vector();
    this.thrusting = false;
    this.thrustingLeft = false;
    this.thrustingRight = false; 

    // Control
    this.maxSpeed = settings.maxSpeed || 1;

    // Light
    this.lightFrequency = 1000;
  }

  update(now) {

    // Velocity
    this.velocity.addTo(this.acceleration);
    this.location.addTo(this.velocity);
    this.acceleration.multiplyBy(0);

    // Angular velocity
    this.angularVelocity += this.angularAcceleration;
    this.angle += this.angularVelocity;
    this.angularAcceleration = 0;

    // Update led
    if (Math.floor(now / this.lightFrequency) % 2) {
      this.model.show(2);
    } else {
      this.model.hide(2);
    }

    // Update model view
    if (this.thrusting) {
      this.model.show(1);
      this.thrusting = false;
    } else {
      this.model.hide(1);
    }
  }

  applyAngularForce(power) {
    this.angularAcceleration += power;
  }

  getSpeed() {
    return this.velocity.getLength();
  }

  getHeading() {
    return this.velocity.getAngle();
  }


  thrust(power) {
    power = power < this.maxThrustPower ? power : this.maxThrustPower;
    this.thruster.setX(Math.cos(this.angle) * power);
    this.thruster.setY(Math.sin(this.angle) * power);
    this.applyForce(this.thruster);
    this.thrusting = true;
    return power;
  }

  thrustLeft(power) {
    power = power < this.maxRotationThrustPower ? power : this.maxRotationThrustPower;
    this.applyAngularForce(power);
    this.thrustingLeft = true;
    return power;
  }

  thrustRight(power) {
    power = power < this.maxRotationThrustPower ? power : this.maxRotationThrustPower;
    this.applyAngularForce(-power);
    this.thrustingRight = true;
    return power;
  }


  rotateTo(destAngle) {
    let diffAngle = destAngle - this.angle;
    let power = this.maxRotorSpeed;

    if (diffAngle > Math.PI) {
      // Rotating towards positive angle inefficiently, rotate the other way around.
      power *= -1;

      if (this.angle < -Math.PI) {
        this.angle += 2 * Math.PI;
      }
    } else if (diffAngle < -Math.PI) {
      // Rotating towards negative angle inefficiently, rotate the other way around.
      if (this.angle > Math.PI) {
        this.angle -= 2 * Math.PI;
      }
    } else {
      // diffAngle direction is fine, just limit to within maxRotorSpeed around 0

      diffAngle = Math.min(this.maxRotorSpeed, diffAngle);
      power = Math.max(-this.maxRotorSpeed, diffAngle);
    }

    this.angle += power;
    return power;
  }

  getRotation(destAngle) {
    let rotationDifference = this.angle - destAngle;
    let reqRotationVel = 0;
    let breakingDistance = this.maxRotorSpeed * 100;
    let maxRotorSpeed = this.maxRotorSpeed;
    const rotation = [0, 0];

    // No angle difference
    if (rotationDifference === 0) {
      return 0;
    }


    // If difference is greater than PI radians, reverse rotating direction
    if (Math.abs(rotationDifference) > Math.PI) {
      rotationDifference += rotationDifference > 0 ? -Math.PI * 2 : Math.PI * 2;
    }

    // Determine required rotation velocity (right => (from PI to < 0) / left => (from -PI to >= 0))
    if (rotationDifference < 0) {
      reqRotationVel = Math.min(this.maxRotorSpeed, Math.abs(rotationDifference));

      breakingDistance *= -1;
      maxRotorSpeed *= -1;

    } else {
      reqRotationVel = Math.max(-this.maxRotorSpeed, -rotationDifference);


    }



    if (Math.abs(rotationDifference) < Math.abs(breakingDistance)) {

      reqRotationVel = Utils.mapRange(rotationDifference, 0, breakingDistance, 0, maxRotorSpeed)
    
    } else if (Math.abs(this.angularVelocity) >= this.maxRotorSpeed) {
    
      return 0;
    }

    return reqRotationVel; //< 0 ? [reqRotationVel, 0] : [0, reqRotationVel];
  }

  rotate(rotationPower) {
    this.applyAngularForce(rotationPower);

    // Keep angle normalized between -PI and PI
    if (this.angle < -Math.PI) {
      this.angle += 2 * Math.PI;
    } else if (this.angle > Math.PI) {
      this.angle -= 2 * Math.PI;
    }
  }


  getRotationOld(destAngle) {
    let rotationDifference = this.angle - destAngle;
    const origRotDiff = rotationDifference;
    let power = 0;
    
    // If difference is greater than PI radians, reverse rotating direction
    if (Math.abs(rotationDifference) > Math.PI) {
      rotationDifference += rotationDifference > 0 ? -Math.PI * 2 : Math.PI * 2;
    }

    if (rotationDifference === 0) {
      return power;
    }

    // Determina rotation side: right => (from PI to < 0) / left => (from -PI to >= 0)
    if (rotationDifference < 0) {
      power = Math.min(this.maxRotorSpeed, Math.abs(rotationDifference));
    } else {
      power = Math.max(-this.maxRotorSpeed, -rotationDifference);
    }

    return power;
  }

  rotateOld(angularSpeed) {

    this.angle += angularSpeed;

    // Keep angle normalized between -PI and PI
    if (this.angle < -Math.PI) {
      this.angle += 2 * Math.PI;
    } else if (this.angle > Math.PI) {
      this.angle -= 2 * Math.PI;
    }
  }

  rotorRight(angularSpeed) {
    angularSpeed = angularSpeed > this.maxRotorSpeed ? this.maxRotorSpeed : angularSpeed;
    this.angle += angularSpeed;
  }

  rotorLeft(angularSpeed) {
    angularSpeed = angularSpeed > this.maxRotorSpeed ? this.maxRotorSpeed : angularSpeed;
    this.angle -= angularSpeed;
  }

  arrive(targetVector, avoidance) {
    avoidance = avoidance || new Vector();

    const minArriveDistance = 150;
    const minArribeForce = 0;
    const dist = targetVector.getLength();

    let arriveStrength = this.maxSpeed;
    if (dist < minArriveDistance) {
      arriveStrength = Utils.mapRange(dist, 0, minArriveDistance, 0, this.maxSpeed);
    }

    // Truncate avoidance force
    const avoidanceStrength = avoidance.getLength();
    const avoidanceStrengthTruncated = Math.min(this.maxSpeed - minArribeForce, avoidanceStrength);
    avoidance.setLength(avoidanceStrengthTruncated);

    // Fit available space with Arrive strength
    arriveStrength = Math.min(arriveStrength, this.maxSpeed - avoidanceStrengthTruncated);

    // Debug
    //this.world.print("Avd: "+ avoidanceStrengthTruncated +" Arr: "+ arriveStrength);


    // Make force relative to SPEED
    // const currSpeed = this.velocity.getLength();
    // const currSpeedProp = Utils.mapRange(currSpeed, 0, this.maxSpeed, 0.1, 1);

    targetVector.normalize();
    targetVector.multiplyBy(arriveStrength); // * currSpeedProp

    // Let the target force be influenced by avoidance
    return targetVector; //avoidance.add(fromTarget);
  }

  escapeGravity(obstacle) {
    const radiusSum = this.radius + obstacle.radius;
    const criticalDistance = 300;

    // Vector from Obstacle to Ship
    const fromObstacle = this.location.substract(obstacle.location);
    const distance = fromObstacle.getLength();
    const gravityForce = this.mass * obstacle.mass / (distance * distance);

    const desired = fromObstacle.copy();
    desired.normalize();
    desired.multiplyBy(gravityForce);

    return desired;
  }

  avoid(obstacle, target) {
    const radiusSum = this.radius + obstacle.radius;
    const criticalDistance = 100 + radiusSum;
    const extendedRadius = obstacle.radius * 1.1;

    // Critical distance
    this.ctx.beginPath();
    this.ctx.arc(obstacle.location.getX() * this.world.scale, obstacle.location.getY() * this.world.scale, (criticalDistance + obstacle.radius) * this.world.scale, 0, Math.PI * 2, false);
    this.ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
    this.ctx.stroke();
    this.ctx.closePath();

    // Extended radius
    this.ctx.beginPath();
    this.ctx.arc(obstacle.location.getX() * this.world.scale, obstacle.location.getY() * this.world.scale, extendedRadius * this.world.scale, 0, Math.PI * 2, false);
    this.ctx.strokeStyle = "rgba(0, 255, 255, 0.3)";
    this.ctx.stroke();
    this.ctx.closePath();


    // Vector from ship to obstacle
    const shipToObstacle = obstacle.location.substract(this.location);
    const distance = shipToObstacle.getLength();
    const surfaceDist = distance - radiusSum;
    const safeDistance = distance - (extendedRadius + this.radius);

    // this.ctx.save();
    // this.ctx.translate(this.location.getX(), this.location.getY())
    // this.ctx.rotate(shipToObstacle.getAngle());
    // this.ctx.beginPath();
    // this.ctx.moveTo(0,0);
    // this.ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    // this.ctx.lineTo(distance, 0);
    // this.ctx.stroke();
    // this.ctx.closePath();
    // this.ctx.restore();





    // Verify if obstacle is between us and the target
    const penetrationDepth = target && this.circleIntersectTest(obstacle, target, extendedRadius);
    const targetIntersects = penetrationDepth >= 0;
    //this.world.print("Target penetrationDepth: " + penetrationDepth);


    // Heading
    const fromTarget = target.substract(this.location);
    const heading = targetIntersects ? fromTarget : this.velocity.copy();

    // this.ctx.save();
    // this.ctx.translate(this.location.getX(), this.location.getY())
    // this.ctx.rotate(heading.getAngle());
    // this.ctx.beginPath();
    // this.ctx.moveTo(0,0);
    // this.ctx.strokeStyle = "rgba(0, 255, 0, 0.1)";
    // this.ctx.lineTo(heading.getLength(), 0);
    // this.ctx.stroke();
    // this.ctx.closePath();
    // this.ctx.restore();


    // Projection
    const projection = heading.project(shipToObstacle);

    // Normal
    const normal = this.location.add(heading).substract(this.location.add(projection));

    // Avoidance
    const avoidance = normal.copy();
    avoidance.normalize();
    avoidance.multiplyBy(extendedRadius);

    // this.ctx.save();
    // this.ctx.translate(obstacle.location.getX(), obstacle.location.getY())
    // this.ctx.rotate(avoidance.getAngle());
    // this.ctx.beginPath();
    // this.ctx.moveTo(0, 0);
    // this.ctx.strokeStyle = "rgba(255, 255, 0, 0.1)";
    // this.ctx.lineTo(avoidance.getLength(), 0);
    // this.ctx.stroke();
    // this.ctx.closePath();
    // this.ctx.restore();



    // Normal (Secant) point
    const normalPoint = obstacle.location.add(avoidance);

    // Side 
    const side = heading.angleDirection(shipToObstacle);

    // Alpha
    const a = Math.asin(extendedRadius / distance);

    // Beta
    const b = shipToObstacle.getAngle();;

    // Tangent angle
    const t = side > 0 ? b - a : b + a;
    const toTangentX = side > 0 ? extendedRadius * Math.sin(t) : extendedRadius * -Math.sin(t);
    const toTangentY = side > 0 ? extendedRadius * -Math.cos(t) : extendedRadius * Math.cos(t);

    // Tangent points
    var T = new Vector({
      x: obstacle.location.getX() + toTangentX,
      y: obstacle.location.getY() + toTangentY
    });

    // this.ctx.beginPath();
    // this.ctx.arc(T.getX(), T.getY(), 3, 0, Math.PI * 2, false);
    // this.ctx.strokeStyle = "rgba(255, 0, 0, 0.5)";
    // this.ctx.stroke();
    // this.ctx.closePath();


    // Tangent
    const tangent = T.substract(this.location);

    // this.ctx.save();
    // this.ctx.translate(this.location.getX(), this.location.getY())
    // this.ctx.rotate(tangent.getAngle());
    // this.ctx.beginPath();
    // this.ctx.moveTo(0, 0);
    // this.ctx.strokeStyle = "rgba(133, 70, 100, 1)";
    // this.ctx.lineTo(tangent.getLength(), 0);
    // this.ctx.stroke();
    // this.ctx.closePath();
    // this.ctx.restore();




    // Angle differenc
    const tangentAngle = tangent.angleBetween(shipToObstacle);
    const headingAngle = heading.angleBetween(shipToObstacle);

    // this.world.print("ha: "+ headingAngle +" ta: "+ tangentAngle);


    // Avoidance conditions
    const intersect = headingAngle <= tangentAngle;
    const overlap = distance < extendedRadius;
    const inRange = surfaceDist > criticalDistance;

    // Test conditions
    if (!overlap && !intersect || inRange) {
      return new Vector();
    }


    // Force strength
    let strength = 0;
    if (safeDistance < criticalDistance) {
      strength = Utils.mapRange(safeDistance, 0, criticalDistance, this.maxSpeed, 0);
    }


    // Make force relative to SPEED
    // const currSpeed = this.velocity.getLength();
    // const currSpeedProp = Utils.mapRange(currSpeed, 0, this.maxSpeed, 0, 1);
    const oppositeForce = this.location.substract(obstacle.location);
    const desired = targetIntersects ? avoidance.copy() : oppositeForce;
    desired.normalize();
    desired.multiplyBy(strength); // * currSpeedProp


    if (obstacle.mass > this.mass) {
      const antiGrav = this.escapeGravity(obstacle);
      desired.addTo(antiGrav);
    }

    return desired;
  }

  /*
    V = sqrt(M/r)
    V^2 = M/r
    M * V^2  = r
    r = M / V^2
  */
  orbitDistanceBySpeed(target, speed) {
    return (this.mass * target.mass) / (speed * speed);
  }

  orbitSpeedByDistance(targetBody, distance) {
    return Math.sqrt((this.mass * targetBody.mass) / distance);
  }

  orbitate(target, distance) {

    // Desired distance lower than target radius
    if (distance < target.radius) {
      console.warn("Orbit distance lower than target radius", target.radius)
      return new Vector();
    }

    // V = sqrt(M/r)
    const requiredSpeed = this.orbitSpeedByDistance(target, distance);

    // Required speed higher than ship speed
    if (requiredSpeed > this.maxSpeed) {
      console.warn("Required speed beyond ship power", requiredSpeed)
      return new Vector();
    }

    const fromTarget = this.location.substract(target.location);

    // Current altitude (distance)
    // this.world.print(fromTarget.getLength(), null, 100);

    fromTarget.normalize();
    fromTarget.multiplyBy(distance);

    // Perpendicular vectors
    const perpLeft = new Vector({
      x: fromTarget.getY(),
      y: -fromTarget.getX(),
      length: target.radius
    });
    const perpRight = new Vector({
      x: -fromTarget.getY(),
      y: fromTarget.getX(),
      length: target.radius
    });

    const normalLeft = target.location.add(fromTarget).add(perpLeft);
    const normalRight = target.location.add(fromTarget).add(perpRight);

    // this.ctx.beginPath();
    // this.ctx.arc(normalLeft.getX() * this.world.scale, normalLeft.getY() * this.world.scale, 3, 0, Math.PI * 2, false);
    // this.ctx.fillStyle = "rgba(0, 255, 0, 0.2)";
    // this.ctx.fill();
    // this.ctx.closePath();

    // this.ctx.beginPath();
    // this.ctx.arc(normalRight.getX() * this.world.scale, normalRight.getY() * this.world.scale, 3, 0, Math.PI * 2, false);
    // this.ctx.fillStyle = "rgba(0, 255, 0, 0.2)";
    // this.ctx.fill();
    // this.ctx.closePath();

    // Choose the nearest normal point
    const heading = this.location.add(this.velocity);

    // Side 
    const side = heading.angleDirection(fromTarget);
    const nearest = side ? normalLeft : normalRight;

    // Nearest perp
    // this.ctx.beginPath();
    // this.ctx.arc(heading.getX() * this.world.scale, heading.getY() * this.world.scale, 2, 0, Math.PI * 2, false);
    // this.ctx.fillStyle = "rgba(255, 0, 0, 0.2)";
    // this.ctx.fill();
    // this.ctx.closePath();

    // Vector from target
    // this.ctx.save();
    // this.ctx.translate(target.location.getX() * this.world.scale, target.location.getY() * this.world.scale)
    // this.ctx.rotate(fromTarget.getAngle());
    // this.ctx.beginPath();
    // this.ctx.moveTo(0, 0);
    // this.ctx.strokeStyle = "rgba(133, 70, 100, 0.1)";
    // this.ctx.lineTo(fromTarget.getLength() * this.world.scale, 0);
    // this.ctx.stroke();
    // this.ctx.closePath();
    // this.ctx.restore();


    const desired = nearest.substract(this.location);
    desired.normalize();
    desired.multiplyBy(requiredSpeed);

    return desired;
  }
}

module.exports = Ship;
