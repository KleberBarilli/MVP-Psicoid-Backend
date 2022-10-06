"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _pacient = _interopRequireDefault(require("@modules/pacient/infra/http/routes/pacient.routes"));

var _session = _interopRequireDefault(require("@modules/auth/infra/http/routes/session.routes"));

var _psico = _interopRequireDefault(require("@modules/psico/infra/http/routes/psico.routes"));

var _password = _interopRequireDefault(require("@modules/auth/infra/http/routes/password.routes"));

var _account = _interopRequireDefault(require("@modules/auth/infra/http/routes/account.routes"));

var _review = _interopRequireDefault(require("@modules/review/infra/http/routes/review.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = (0, _express.Router)();
routes.use("/pacient", _pacient.default);
routes.use("/session", _session.default);
routes.use("/psico", _psico.default);
routes.use("/password", _password.default);
routes.use("/account", _account.default);
routes.use("/review", _review.default);
var _default = routes;
exports.default = _default;