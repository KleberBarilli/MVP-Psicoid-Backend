"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("@shared/errors/AppError"));

var _tsyringe = require("tsyringe");

var _ICredentialsRepository = require("../domain/repositories/ICredentialsRepository");

var _IHashProvider = require("../providers/HashProvider/models/IHashProvider");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let SendForgotPasswordEmailService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("CredentialsRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("HashProvider")(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _ICredentialsRepository.ICredentialsRepository === "undefined" ? Object : _ICredentialsRepository.ICredentialsRepository, typeof _IHashProvider.IHashProvider === "undefined" ? Object : _IHashProvider.IHashProvider]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class SendForgotPasswordEmailService {
  constructor(credentialsRepository, hashProvider) {
    this.credentialsRepository = credentialsRepository;
    this.hashProvider = hashProvider;
  }

  async execute({
    token,
    password
  }) {
    const user = await this.credentialsRepository.findByToken(token);

    if (!user) {
      throw new _AppError.default("Código inválido");
    }

    const hashedPassword = await this.hashProvider.generateHash(password || "");
    await this.credentialsRepository.updatePassword(user.id, hashedPassword);
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.default = SendForgotPasswordEmailService;