"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _UsersController = _interopRequireDefault(require("../controllers/UsersController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const usersRouter = (0, _express.Router)();
const usersController = new _UsersController.default();
usersRouter.post('/', usersController.create);
var _default = usersRouter;
exports.default = _default;