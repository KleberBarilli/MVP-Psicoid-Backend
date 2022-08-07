"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _clients = _interopRequireDefault(require("../../../../modules/clients/infra/http/routes/clients.routes"));

var _sessions = _interopRequireDefault(require("../../../../modules/auth/infra/http/routes/sessions.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = (0, _express.Router)();
routes.use('/clients', _clients.default);
routes.use('/sessions', _sessions.default);
var _default = routes;
exports.default = _default;