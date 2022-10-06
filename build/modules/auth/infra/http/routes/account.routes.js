"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _isAuthenticated = _interopRequireDefault(require("@shared/infra/http/middlewares/isAuthenticated"));

var _express = require("express");

var _DeactivateAccountController = _interopRequireDefault(require("../controllers/DeactivateAccountController"));

var _UpdateCredentials = _interopRequireDefault(require("../controllers/UpdateCredentials"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const accountRouter = (0, _express.Router)();
accountRouter.post("/deactivate", _isAuthenticated.default, new _DeactivateAccountController.default().handle);
accountRouter.put("/", _isAuthenticated.default, new _UpdateCredentials.default().handle);
var _default = accountRouter;
exports.default = _default;