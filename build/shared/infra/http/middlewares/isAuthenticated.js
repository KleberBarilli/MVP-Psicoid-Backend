"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isAuthenticated;

var _jsonwebtoken = require("jsonwebtoken");

var _AppError = _interopRequireDefault(require("@shared/errors/AppError"));

var _auth = _interopRequireDefault(require("@config/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isAuthenticated(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new _AppError.default("JWT Token is missing.");
  }

  const [, token] = authHeader.split(" ");

  try {
    const decodedToken = (0, _jsonwebtoken.verify)(token, _auth.default.jwt.secret);
    const {
      sub,
      profile,
      profileId
    } = decodedToken;
    req.user = {
      id: sub,
      profile,
      profileId
    };
    return next();
  } catch {
    throw new _AppError.default("Invalid JWT Token.", 401);
  }
}