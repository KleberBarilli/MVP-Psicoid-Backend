"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ShowPacientService = _interopRequireDefault(require("../../../services/ShowPacientService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ShowPacientController {
  async handle(req, res) {
    try {
      const {
        id
      } = req.params;

      const showPacient = _tsyringe.container.resolve(_ShowPacientService.default);

      const pacient = await showPacient.execute(id);
      return res.status(200).json({
        data: pacient
      });
    } catch (error) {
      return res.status(400).json({
        error: "Houve um erro ao buscar o usuário"
      });
    }
  }

}

exports.default = ShowPacientController;