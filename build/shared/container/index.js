"use strict";

var _tsyringe = require("tsyringe");

var _UsersRepository = _interopRequireDefault(require("../../modules/users/infra/mongoose/repositories/UsersRepository"));

require("../../modules/users/providers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_tsyringe.container.registerSingleton('UsersRepository', _UsersRepository.default);