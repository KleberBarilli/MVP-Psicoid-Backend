"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _UpdateReviewService = _interopRequireDefault(require("@modules/review/services/UpdateReviewService"));

var _Review = require("@shared/utils/validators/Review");

var _BadRequest = require("@shared/errors/BadRequest");

var _yup = require("yup");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UpdateReviewController {
  async handle(req, res) {
    try {
      const {
        review: {
          rating,
          comment
        }
      } = req.body;
      const {
        id
      } = req.params;
      await (0, _Review.validateReview)({
        rating,
        comment
      });

      const service = _tsyringe.container.resolve(_UpdateReviewService.default);

      const review = await service.execute({
        id,
        rating,
        comment
      });
      return res.status(204).json({
        data: review,
        message: "Review atualizada com sucesso"
      });
    } catch (error) {
      if (error instanceof _yup.ValidationError) {
        return (0, _BadRequest.sendBadRequest)(req, res, error.message, 400);
      }

      return res.status(500).json({
        error: "Internal Error"
      });
    }
  }

}

exports.default = UpdateReviewController;