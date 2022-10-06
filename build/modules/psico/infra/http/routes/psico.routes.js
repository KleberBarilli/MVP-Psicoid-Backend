"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _isAuthenticated = _interopRequireDefault(require("@shared/infra/http/middlewares/isAuthenticated"));

var _CreatePsychologistController = _interopRequireDefault(require("../controllers/CreatePsychologistController"));

var _ListPsychologistsController = _interopRequireDefault(require("../controllers/ListPsychologistsController"));

var _ShowPsychologistController = _interopRequireDefault(require("../controllers/ShowPsychologistController"));

var _UpdatePsychologistController = _interopRequireDefault(require("../controllers/UpdatePsychologistController"));

var _pagination = require("@shared/infra/http/middlewares/pagination");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const psicoRouter = (0, _express.Router)();
psicoRouter.post("/", new _CreatePsychologistController.default().handle);
psicoRouter.put("/", _isAuthenticated.default, new _UpdatePsychologistController.default().handle);
psicoRouter.get("/:id", _isAuthenticated.default, new _ShowPsychologistController.default().handle);
psicoRouter.get("/", _pagination.pagination, _isAuthenticated.default, new _ListPsychologistsController.default().handle);
var _default = psicoRouter;
exports.default = _default;