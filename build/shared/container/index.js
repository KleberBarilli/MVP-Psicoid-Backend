"use strict";

var _tsyringe = require("tsyringe");

var _ClientsRepository = _interopRequireDefault(require("../../modules/clients/infra/prisma/repositories/ClientsRepository"));

require("../../modules/auth/providers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_tsyringe.container.registerSingleton('ClientsRepository', _ClientsRepository.default);