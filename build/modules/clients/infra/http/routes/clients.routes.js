"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _ClientsController = _interopRequireDefault(require("../controllers/ClientsController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const clientsRouter = (0, _express.Router)();
const clientsController = new _ClientsController.default();
clientsRouter.post('/', clientsController.create);
var _default = clientsRouter;
exports.default = _default;