"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ShowPsychologistService = _interopRequireDefault(require("../../../services/ShowPsychologistService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ShowPsychologistController {
  async handle(req, res) {
    try {
      const {
        id
      } = req.params;

      const showPsychologist = _tsyringe.container.resolve(_ShowPsychologistService.default);

      const psychologist = await showPsychologist.execute(id);
      return res.status(200).json({
        data: psychologist
      });
    } catch (error) {
      return res.status(400).json({
        error: "Houve um erro ao buscar o usuário"
      });
    }
  }

}

exports.default = ShowPsychologistController;