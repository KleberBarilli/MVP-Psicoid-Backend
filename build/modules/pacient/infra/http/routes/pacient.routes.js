"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _isAuthenticated = _interopRequireDefault(require("@shared/infra/http/middlewares/isAuthenticated"));

var _express = require("express");

var _AddPsychologistController = _interopRequireDefault(require("../controllers/AddPsychologistController"));

var _CreatePacientController = _interopRequireDefault(require("../controllers/CreatePacientController"));

var _ShowPacientController = _interopRequireDefault(require("../controllers/ShowPacientController"));

var _UpdatePacientController = _interopRequireDefault(require("../controllers/UpdatePacientController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const pacientRouter = (0, _express.Router)();
pacientRouter.post("/", new _CreatePacientController.default().handle);
pacientRouter.get("/:id", new _ShowPacientController.default().handle);
pacientRouter.put("/", _isAuthenticated.default, new _UpdatePacientController.default().handle);
pacientRouter.post("/add-psychologist", _isAuthenticated.default, new _AddPsychologistController.default().handle);
var _default = pacientRouter;
exports.default = _default;