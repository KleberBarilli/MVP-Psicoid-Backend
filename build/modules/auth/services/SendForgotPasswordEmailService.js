"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("@shared/errors/AppError"));

var _etc = require("@shared/utils/etc");

var _emailBuilder = require("@shared/utils/emailBuilder");

var _ICredentialsRepository = require("../domain/repositories/ICredentialsRepository");

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let SendForgotPasswordEmailService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("CredentialsRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _ICredentialsRepository.ICredentialsRepository === "undefined" ? Object : _ICredentialsRepository.ICredentialsRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class SendForgotPasswordEmailService {
  constructor(credentialsRepository) {
    this.credentialsRepository = credentialsRepository;
  }

  async execute({
    email
  }) {
    const user = await this.credentialsRepository.findByEmail(email);

    if (!user) {
      throw new _AppError.default("User does not exists.");
    }

    const tokenRecovery = (0, _etc.generateRandomNumber)(6);
    await this.credentialsRepository.updateToken(user.id, tokenRecovery);
    await (0, _emailBuilder.sendEmail)(email, tokenRecovery, "no-reply-psicoId@psicoid.com.br");
  }

}) || _class) || _class) || _class) || _class);
exports.default = SendForgotPasswordEmailService;