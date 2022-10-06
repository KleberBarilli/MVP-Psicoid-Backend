"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ListPsychologistsService = _interopRequireDefault(require("@modules/psico/services/ListPsychologistsService"));

var _tsyringe = require("tsyringe");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ListPsychologistsController {
  async handle(req, res) {
    try {
      const {
        pagination
      } = req;

      const service = _tsyringe.container.resolve(_ListPsychologistsService.default);

      const [count, psychologists] = await service.execute(pagination);
      return res.status(200).json({
        count,
        data: psychologists
      });
    } catch (error) {
      return res.status(500).json({
        error: "Houve um erro ao listar"
      });
    }
  }

}

exports.default = ListPsychologistsController;