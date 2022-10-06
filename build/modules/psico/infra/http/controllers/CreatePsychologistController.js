"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _yup = require("yup");

var _runtime = require("@prisma/client/runtime");

var _Credentials = require("@shared/utils/validators/Credentials");

var _Address = require("@shared/utils/validators/Address");

var _Contact = require("@shared/utils/validators/Contact");

var _Identity = require("@shared/utils/validators/Identity");

var _BadRequest = require("@shared/errors/BadRequest");

var _CreatePsychologistService = _interopRequireDefault(require("../../../services/CreatePsychologistService"));

var _AppError = _interopRequireDefault(require("@shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CreatePsychologistController {
  async handle(req, res) {
    try {
      const {
        psico: {
          credentials,
          identity,
          contact,
          address,
          office,
          resume
        }
      } = req.body;
      credentials.email = credentials.email.toLowerCase();
      await Promise.all([(0, _Credentials.validateCredentials)(credentials), (0, _Identity.validateIdentity)(identity), (0, _Contact.validateContact)(contact), (0, _Address.validateAddress)(address)]);

      const service = _tsyringe.container.resolve(_CreatePsychologistService.default);

      const user = await service.execute({
        credential: credentials,
        identity,
        contact,
        address,
        office,
        resume
      });
      return res.status(201).json({
        data: user,
        message: "Psychologist created with success"
      });
    } catch (error) {
      if (error instanceof _runtime.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          return res.status(400).json({
            error: "Já existe um CPF ou CNPJ igual cadastrado no sistema."
          });
        }
      }

      if (error instanceof _yup.ValidationError) {
        return (0, _BadRequest.sendBadRequest)(req, res, error.message, 400);
      }

      if (error instanceof _AppError.default) {
        return (0, _BadRequest.sendBadRequest)(req, res, error.message, error.statusCode);
      }

      return res.status(500).json({
        error
      });
    }
  }

}

exports.default = CreatePsychologistController;