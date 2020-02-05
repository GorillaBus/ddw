class Utils {

  constructor() {
    this.cache = {};
  }

  cacheStore(caller, key, value) {
    if (!this.cache.hasOwnProperty(caller)) {
      this.cache[caller] = {};
    }
    this.cache[caller][key] = value;
  }

  cacheRetrieve(caller, key) {
    let fnCache = this.cache[caller] || [];
    let value = fnCache[key] || false;
    return value;
  }

  getNormalPoint(p, a, b) {
    let ap = p.substract(a);
    let ab = b.substract(a);
    ab.normalize();
    ab.multiplyBy(ap.dot(ab));
    return a.add(ab);
  }

  getAngleBetween(v1, v2) {
    v1.normalize();
    v2.normalize();
    let dot = v1.dot(v2);
    let theta = Math.acos(dot);

    if (isNaN(theta)) {
      console.warn("Theta is 'NaN' on Utils.getAngleBetween()")
    }
    return theta;
  }

  /*
  *  Get 'n' points from a circular shaped 'Particle' object
  */
  getCirclePoints(p, n, radius) {
    n = n || 8;
    radius = radius || p.radius || 0;

    let angle = -1;
    let angleStep = (Math.PI * 2) / n;
    let points = [];

    for (let i=0; i<n; i++) {
      let cData = this.cacheRetrieve("getCirclePoints", angle);
      let cos = cData.cos || Math.cos(angle);
      let sin = cData.sin || Math.sin(angle);
      let pt = {
        x: p.x + (cos * p.radius),
        y: p.y + (sin * p.radius)
      };
      points.push(pt);
      if (!cData) {
        this.cacheStore("getCirclePoints", angle, {cos: cos, sin: sin});
      }
      angle += angleStep;
    }

    // Add the center point
    return points;
  }

  montecarlo() {
    while(true) {
      let r1 = Math.random();
      let p = r1;
      let r2 = Math.random();
      if (r2 < p) {
        return r1;
      }
    }
  }

  lerp(norm, min, max) {
    return (max - min) * norm + min;
  }

  quadratic(a,b,c) {
    var sol = null;
    if (Math.abs(a) < 1e-6) {
      if (Math.abs(b) < 1e-6) {
        sol = Math.abs(c) < 1e-6 ? [0,0] : null;
      } else {
        sol = [-c/b, -c/b];
      }
    } else {
      var disc = b*b - 4*a*c;
      if (disc >= 0) {
        disc = Math.sqrt(disc);
        a = 2*a;
        sol = [(-b-disc)/a, (-b+disc)/a];
      }
    }
    return sol;
  };

  quadraticBezier(p0, p1, p2, t, pFinal) {
    pFinal = pFinal || {};
    pFinal.x = Math.pow(1 - t, 2) * p0.x + (1 - t) * 2 * t * p1.x + t * t * p2.x;
    pFinal.y = Math.pow(1 - t, 2) * p0.y + (1 - t) * 2 * t * p1.y + t * t * p2.y;
    return pFinal;
  }

  cubicBezier(p0, p1, p2, p3, t, pFinal) {
    pFinal = pFinal || {};
    pFinal.x = Math.pow(1 - t, 3) * p0.x + Math.pow(1 - t, 2) * 3 * t * p1.x + (1 - t) * 3 * t * t * p2.x + t * t * t * p3.x;
    pFinal.y = Math.pow(1 - t, 3) * p0.y + Math.pow(1 - t, 2) * 3 * t * p1.y + (1 - t) * 3 * t * t * p2.y + t * t * t * p3.y;
    return pFinal;
  }

  distance(p0, p1) {
    let dx = p0.x - p1.x;
    let dy = p0.y - p1.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  distanceXY(x0, y0, x1, y1) {
    let dx = x1 - x0;
    let dy = y1 - y0;
    return Math.sqrt(dx * dx + dy * dy);
  }

  randomAngle() {
    return this.randomRange(-Math.PI, Math.PI);
  }

  // TODO: Check if and why we need to parseInt() the result
  mapRange(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
  }

  inRange(value, min, max) {
    return value >= Math.min(min, max) && value <= Math.max(min, max);
  }

  rangeIntersect(min0, max0, min1, max1) {
    return  Math.max(min0, max0) >= Math.min(min1, max1) &&
    Math.min(min0, max0) <= Math.max(min1, max1);
  }

  randomRange(min, max) {
    return min + Math.random() * (max - min);
  }

  constrain(e,t,r) {
    return e>r?r:e<t?t:e;
  }

  intersect(x1, y1, x2, y2, x3, y3, x4, y4) {
    if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
      return false;
    }
    const denominator = ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
    // Lines are parallel
    if (denominator === 0) {
      return false;
    }
    const ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator;
    const ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator;
    // is the intersection along the segments
    if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
      return false;
    }
    // Return a object with the x and y coordinates of the intersection
    const x = x1 + ua * (x2 - x1);
    const y = y1 + ua * (y2 - y1);
    return { x, y }
  }

  circleCollision(c0, c1) {
    return this.distance(c0, c1) <= c0.radius + c1.radius;
  }

  rectangleCollision(r0, r1) {
    return  this.rangeIntersect(r0.x, r0.x + r0.width, r1.x, r1.x + r1.width) &&
    this.rangeIntersect(r0.y, r0.y + r0.height, r1.y, r1.y + r1.height);
  }

  circlePointCollision(px, py, circle) {
    const d = this.distanceXY(px, py, circle.x, circle.y) < circle.radius;
    console.log(this.distanceXY(px, py, circle.x, circle.y))
    return d;
  }

  rectanglePointCollision(px, py, rect) {
    return  this.inRange(px, rect.x, rect.x + rect.width) &&
    this.inRange(py, rect.y, rect.y + rect.height);
  }


  circleRectangleCollision(circle, rect) {
    const distX = Math.abs(circle.x - rect.x - rect.width / 2);
    const distY = Math.abs(circle.y - rect.y - rect.height / 2);

    // Out of range
    if (distX > (rect.width / 2 + circle.radius) || distY > (rect.height / 2 + circle.radius)) {
      return false;
    }

    // In range
    if (distX <= (rect.width / 2) || distY <= (rect.height / 2)) {
       return true;
    }

    // Rectangle corners
    const dx = distX - rect.width / 2;
    const dy = distY - rect.height / 2;
    return (dx * dx + dy * dy <= (circle.radius * circle.radius));
  }


  uniqueID() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
  }

  randomColor() {
    return "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
  }

  rad2deg(r) {
    return r * 180 / Math.PI;
  }

  deg2rad(d) {
    return d * Math.PI / 180;
  }

  hexToRGB(hex) {
    let color = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return color ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
  }
}

const instance = new Utils();

module.exports = instance;
