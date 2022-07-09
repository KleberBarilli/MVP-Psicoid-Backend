"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _CreateUserService = _interopRequireDefault(require("../../../services/CreateUserService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UsersController {
  async create(req, res) {
    const {
      name,
      email,
      password
    } = req.body;

    const createUser = _tsyringe.container.resolve(_CreateUserService.default);

    const user = await createUser.execute({
      name,
      email,
      password
    });
    return res.json(user);
  }

}

exports.default = UsersController;