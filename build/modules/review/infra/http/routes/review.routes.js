"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _isAuthenticated = _interopRequireDefault(require("@shared/infra/http/middlewares/isAuthenticated"));

var _CreateReviewController = _interopRequireDefault(require("../controllers/CreateReviewController"));

var _UpdateReviewController = _interopRequireDefault(require("../controllers/UpdateReviewController"));

var _ShowReviewController = _interopRequireDefault(require("../controllers/ShowReviewController"));

var _ListReviewsByPsicoController = _interopRequireDefault(require("../controllers/ListReviewsByPsicoController"));

var _DeleteReviewController = _interopRequireDefault(require("../controllers/DeleteReviewController"));

var _pagination = require("@shared/infra/http/middlewares/pagination");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const reviewRouter = (0, _express.Router)();
reviewRouter.post("/", _isAuthenticated.default, new _CreateReviewController.default().handle);
reviewRouter.get("/:id", _isAuthenticated.default, new _ShowReviewController.default().handle);
reviewRouter.get("/psico/:id", _isAuthenticated.default, _pagination.pagination, new _ListReviewsByPsicoController.default().handle);
reviewRouter.put("/:id", _isAuthenticated.default, new _UpdateReviewController.default().handle);
reviewRouter.delete("/:id", _isAuthenticated.default, new _DeleteReviewController.default().handle);
var _default = reviewRouter;
exports.default = _default;