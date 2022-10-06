"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _ForgotPasswordController = _interopRequireDefault(require("../controllers/ForgotPasswordController"));

var _ResetPasswordController = _interopRequireDefault(require("../controllers/ResetPasswordController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const passwordRouter = (0, _express.Router)();
passwordRouter.post("/forgot", new _ForgotPasswordController.default().handle);
passwordRouter.post("/reset", new _ResetPasswordController.default().handle);
var _default = passwordRouter;
exports.default = _default;