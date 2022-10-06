"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _WhoiamService = _interopRequireDefault(require("../../../services/WhoiamService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class WhoiamController {
  async handle(req, res) {
    try {
      const whoiam = _tsyringe.container.resolve(_WhoiamService.default);

      const user = await whoiam.execute(req.user.id, req.user.profile);
      return res.status(200).json({
        message: "User Found",
        data: { ...user,
          password: null
        }
      });
    } catch (err) {
      return res.status(500).json({
        message: "Erro interno do servidor"
      });
    }
  }

}

exports.default = WhoiamController;