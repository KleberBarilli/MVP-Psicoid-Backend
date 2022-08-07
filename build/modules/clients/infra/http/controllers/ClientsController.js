"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Credentials = require("../../../../../shared/utils/validators/Credentials");

var _Address = require("../../../../../shared/utils/validators/Address");

var _Contact = require("../../../../../shared/utils/validators/Contact");

var _Identity = require("../../../../../shared/utils/validators/Identity");

var _tsyringe = require("tsyringe");

var _CreateClientService = _interopRequireDefault(require("../../../services/CreateClientService"));

var _runtime = require("@prisma/client/runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ClientsController {
  async create(req, res) {
    try {
      const {
        client: {
          credentials,
          identity,
          contact,
          address
        }
      } = req.body;
      credentials.email = credentials.email.toLowerCase();
      await Promise.all([(0, _Credentials.validateCredentials)(credentials), (0, _Identity.validateIdentity)(identity), (0, _Contact.validateContact)(contact), (0, _Address.validateAddress)(address)]);

      const createClient = _tsyringe.container.resolve(_CreateClientService.default);

      const user = await createClient.execute({
        credential: credentials,
        identity,
        contact,
        address
      });
      return res.json({
        data: user,
        message: 'Client created with success'
      });
    } catch (error) {
      if (error instanceof _runtime.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          return res.status(400).json({
            error: 'Já existe um CPF igual cadastrado no sistema.'
          });
        }
      }

      return res.status(400).json({
        error
      });
    }
  }

}

exports.default = ClientsController;