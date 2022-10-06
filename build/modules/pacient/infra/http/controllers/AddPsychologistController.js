"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _AddPsychologistService = _interopRequireDefault(require("@modules/pacient/services/AddPsychologistService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AddPsychologistController {
  async handle(req, res) {
    try {
      const {
        profileId
      } = req.user;
      const {
        psychologistId,
        selected
      } = req.body;

      const service = _tsyringe.container.resolve(_AddPsychologistService.default);

      await service.execute({
        pacientId: profileId,
        psychologistId,
        selected
      });
      return res.status(200).json({
        message: "Adicionado com sucesso"
      });
    } catch (error) {
      return res.status(500).json({
        error: "Internal Error"
      });
    }
  }

}

exports.default = AddPsychologistController;