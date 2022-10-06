"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _DeactivateAccountService = _interopRequireDefault(require("@modules/auth/services/DeactivateAccountService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DeactivateAccountController {
  async handle(req, res) {
    const {
      id
    } = req.user;

    try {
      const deactivate = _tsyringe.container.resolve(_DeactivateAccountService.default);

      await deactivate.execute(id);
      return res.status(204).json({
        message: "A conta foi desativada com sucesso"
      });
    } catch (error) {
      return res.status(400).json({
        message: "Erro ao desativar a conta"
      });
    }
  }

}

exports.default = DeactivateAccountController;