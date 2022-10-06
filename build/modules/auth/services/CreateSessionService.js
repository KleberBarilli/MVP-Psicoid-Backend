"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _jsonwebtoken = require("jsonwebtoken");

var _auth = _interopRequireDefault(require("@config/auth"));

var _AppError = _interopRequireDefault(require("@shared/errors/AppError"));

var _IHashProvider = require("../providers/HashProvider/models/IHashProvider");

var _ICredentialsRepository = require("../domain/repositories/ICredentialsRepository");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateSessionService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("CredentialsRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("HashProvider")(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _ICredentialsRepository.ICredentialsRepository === "undefined" ? Object : _ICredentialsRepository.ICredentialsRepository, typeof _IHashProvider.IHashProvider === "undefined" ? Object : _IHashProvider.IHashProvider]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class CreateSessionService {
  constructor(credentialsRepository, hashProvider) {
    this.credentialsRepository = credentialsRepository;
    this.hashProvider = hashProvider;
  }

  async execute({
    email,
    password
  }) {
    const user = await this.credentialsRepository.findByEmail(email);

    if (!user) {
      throw new _AppError.default("Usuário não encontrado", 401);
    }

    if (user.inactive) {
      throw new _AppError.default("A conta do usuaŕio está inativa", 403);
    }

    const passwordConfirmed = await this.hashProvider.compareHash(password || "", user.password);

    if (!passwordConfirmed) {
      throw new _AppError.default("Email ou senha inválidos", 401);
    }

    const token = (0, _jsonwebtoken.sign)({
      profile: user.role,
      profileId: user?.psychologist?.id || user?.pacient?.id
    }, _auth.default.jwt.secret, {
      subject: user.id,
      expiresIn: _auth.default.jwt.expiresIn
    });
    return {
      user,
      token
    };
  }

}) || _class) || _class) || _class) || _class) || _class);
var _default = CreateSessionService;
exports.default = _default;