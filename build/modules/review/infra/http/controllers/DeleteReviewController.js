"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _DeleteReviewService = _interopRequireDefault(require("../../../services/DeleteReviewService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DeleteReviewController {
  async handle(req, res) {
    try {
      const {
        id
      } = req.params;

      const service = _tsyringe.container.resolve(_DeleteReviewService.default);

      await service.execute(id);
      return res.status(200).json({
        message: "Review removida com sucesso"
      });
    } catch (error) {
      return res.status(400).json({
        error: "Houve um erro ao remover a review"
      });
    }
  }

}

exports.default = DeleteReviewController;