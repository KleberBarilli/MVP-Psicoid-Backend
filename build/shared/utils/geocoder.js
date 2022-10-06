"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getGeocode = void 0;

var _nodeGeocoder = _interopRequireDefault(require("node-geocoder"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const geocoder = (0, _nodeGeocoder.default)({
  provider: "opencage",
  apiKey: process.env.GEOCODE_API_KEY
});

const getGeocode = async address => {
  return await geocoder.geocode({
    country: "Brazil",
    countryCode: "br",
    limit: 1,
    address
  });
};

exports.getGeocode = getGeocode;