"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ICredentialsRepository = require("../domain/repositories/ICredentialsRepository");

var _dec, _dec2, _dec3, _dec4, _class;

let DeactivateAccountService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("CredentialsRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _ICredentialsRepository.ICredentialsRepository === "undefined" ? Object : _ICredentialsRepository.ICredentialsRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class DeactivateAccountService {
  constructor(credentialsRepository) {
    this.credentialsRepository = credentialsRepository;
  }

  async execute(id) {
    await this.credentialsRepository.deactivateAccount(id);
  }

}) || _class) || _class) || _class) || _class);
exports.default = DeactivateAccountService;