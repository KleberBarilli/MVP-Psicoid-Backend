"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ListReviewsByPsicoService = _interopRequireDefault(require("../../../services/ListReviewsByPsicoService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ListReviewsByPsicoController {
  async handle(req, res) {
    try {
      const {
        id
      } = req.params;
      const {
        pagination
      } = req;

      const service = _tsyringe.container.resolve(_ListReviewsByPsicoService.default);

      const reviews = await service.execute(id, pagination);
      return res.status(200).json({
        data: reviews
      });
    } catch (error) {
      return res.status(400).json({
        error: "Houve um erro ao buscar as reviews"
      });
    }
  }

}

exports.default = ListReviewsByPsicoController;