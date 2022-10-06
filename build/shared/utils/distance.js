"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getKmDistance = void 0;

var _haversineDistance = _interopRequireDefault(require("haversine-distance"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getKmDistance = (point1, point2) => {
  return (0, _haversineDistance.default)(point1, point2) / 1000;
};

exports.getKmDistance = getKmDistance;