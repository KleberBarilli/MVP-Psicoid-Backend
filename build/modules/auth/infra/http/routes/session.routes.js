"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _isAuthenticated = _interopRequireDefault(require("@shared/infra/http/middlewares/isAuthenticated"));

var _express = require("express");

var _CreateSessionController = _interopRequireDefault(require("../controllers/CreateSessionController"));

var _WhoiamController = _interopRequireDefault(require("../controllers/WhoiamController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const sessionRouter = (0, _express.Router)();
sessionRouter.post("/", new _CreateSessionController.default().handle);
sessionRouter.get("/whoiam", _isAuthenticated.default, new _WhoiamController.default().handle);
var _default = sessionRouter;
exports.default = _default;