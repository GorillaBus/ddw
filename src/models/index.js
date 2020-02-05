const Point = require('./Point');
const Triangle = require('./Triangle');
const Square = require('./Square');
const Ship = require('./Ship');

const copy = (obj) => {
  return JSON.parse(JSON.stringify(obj));
}

module.exports = {
  point: copy(Point),
  triangle: copy(Triangle),
  square: copy(Square),
  ship: copy(Ship)
}
