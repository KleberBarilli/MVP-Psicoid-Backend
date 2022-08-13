"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Credentials = require("../../../../../shared/utils/validators/Credentials");

var _tsyringe = require("tsyringe");

var _CreateSessionsService = _interopRequireDefault(require("../services/CreateSessionsService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SessionsController {
  async create(request, response) {
    const {
      email,
      password
    } = request.body;

    try {
      await (0, _Credentials.validateLogin)({
        email,
        password
      });

      const createSession = _tsyringe.container.resolve(_CreateSessionsService.default);

      const user = await createSession.execute({
        email,
        password
      });
      return response.json(user);
    } catch (err) {
      return response.status(400).json({
        error: 'Error with login'
      });
    }
  }

}

exports.default = SessionsController;