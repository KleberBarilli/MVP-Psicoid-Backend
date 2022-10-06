"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _Credentials = require("@validators/Credentials");

var _CreateSessionService = _interopRequireDefault(require("../../../services/CreateSessionService"));

var _AppError = _interopRequireDefault(require("@shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CreateSessionController {
  async handle(req, res) {
    const {
      email,
      password
    } = req.body;

    try {
      await (0, _Credentials.validateLogin)({
        email,
        password
      });

      const createSession = _tsyringe.container.resolve(_CreateSessionService.default);

      const user = await createSession.execute({
        email,
        password
      });
      return res.json({
        data: user
      });
    } catch (err) {
      if (err instanceof _AppError.default) {
        return res.status(err.statusCode).json({
          message: err.message
        });
      }

      return res.status(500).json({
        error: "Erro ao logar"
      });
    }
  }

}

exports.default = CreateSessionController;