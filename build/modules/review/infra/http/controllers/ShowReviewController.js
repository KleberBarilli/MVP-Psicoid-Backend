"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ShowReviewService = _interopRequireDefault(require("../../../services/ShowReviewService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ShowReviewController {
  async handle(req, res) {
    try {
      const {
        id
      } = req.params;

      const service = _tsyringe.container.resolve(_ShowReviewService.default);

      const review = await service.execute(id);
      return res.status(200).json({
        data: review
      });
    } catch (error) {
      return res.status(400).json({
        error: "Houve um erro ao buscar a review"
      });
    }
  }

}

exports.default = ShowReviewController;