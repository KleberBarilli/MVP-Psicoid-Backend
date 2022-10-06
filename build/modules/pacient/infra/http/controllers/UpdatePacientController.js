"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _yup = require("yup");

var _runtime = require("@prisma/client/runtime");

var _Address = require("@shared/utils/validators/Address");

var _Contact = require("@shared/utils/validators/Contact");

var _Identity = require("@shared/utils/validators/Identity");

var _BadRequest = require("@shared/errors/BadRequest");

var _UpdatePacientService = _interopRequireDefault(require("@modules/pacient/services/UpdatePacientService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UpdatePacientController {
  async handle(req, res) {
    try {
      const {
        pacient: {
          identity,
          contact,
          address,
          selectedPsychologistId
        }
      } = req.body;
      const {
        profileId
      } = req.user;
      await Promise.all([(0, _Identity.validateUpdateIdentity)(identity), (0, _Contact.validateContact)(contact), (0, _Address.validateUpdateAddress)(address)]);

      const updatePacient = _tsyringe.container.resolve(_UpdatePacientService.default);

      const user = await updatePacient.execute(profileId, {
        identity,
        contact,
        address,
        selectedPsychologistId
      });
      return res.status(204).json({
        data: user,
        message: "Pacient updated with success"
      });
    } catch (error) {
      if (error instanceof _runtime.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          return res.status(400).json({
            error: "Já existe um CPF igual cadastrado no sistema."
          });
        }
      }

      if (error instanceof _yup.ValidationError) {
        return (0, _BadRequest.sendBadRequest)(req, res, error.message, 400);
      }

      return res.status(500).json({
        error: "Internal Error"
      });
    }
  }

}

exports.default = UpdatePacientController;