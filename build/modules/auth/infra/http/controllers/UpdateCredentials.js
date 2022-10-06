"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _UpdateCredentials = _interopRequireDefault(require("@modules/auth/services/UpdateCredentials"));

var _AppError = _interopRequireDefault(require("@shared/errors/AppError"));

var _BadRequest = require("@shared/errors/BadRequest");

var _tsyringe = require("tsyringe");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UpdateCredentialsController {
  async handle(req, res) {
    const {
      email,
      password
    } = req.body;
    const {
      id
    } = req.user;

    try {
      const updateCredentials = _tsyringe.container.resolve(_UpdateCredentials.default);

      await updateCredentials.execute(id, {
        email,
        password
      });
      return res.status(204).json();
    } catch (error) {
      if (error instanceof _AppError.default) {
        return (0, _BadRequest.sendBadRequest)(req, res, error.message, error.statusCode);
      }

      return res.status(500).json({
        error: "Internal Server Error"
      });
    }
  }

}

exports.default = UpdateCredentialsController;