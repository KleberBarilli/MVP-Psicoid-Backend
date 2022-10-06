"use strict";

var _tsyringe = require("tsyringe");

require("@modules/auth/providers");

var _PacientsRepository = _interopRequireDefault(require("@modules/pacient/infra/prisma/repositories/PacientsRepository"));

var _PsychologistsRepository = _interopRequireDefault(require("@modules/psico/infra/prisma/repositories/PsychologistsRepository"));

var _CredentialsRepository = _interopRequireDefault(require("@modules/auth/infra/prisma/repositories/CredentialsRepository"));

var _ReviewsRepository = _interopRequireDefault(require("@modules/review/infra/prisma/repositories/ReviewsRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_tsyringe.container.registerSingleton("CredentialsRepository", _CredentialsRepository.default);

_tsyringe.container.registerSingleton("PacientsRepository", _PacientsRepository.default);

_tsyringe.container.registerSingleton("PsychologistsRepository", _PsychologistsRepository.default);

_tsyringe.container.registerSingleton("ReviewsRepository", _ReviewsRepository.default);