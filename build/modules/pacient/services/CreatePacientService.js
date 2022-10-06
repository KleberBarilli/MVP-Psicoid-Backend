"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _IPacientsRepository = require("../domain/repositories/IPacientsRepository");

var _IHashProvider = require("@modules/auth/providers/HashProvider/models/IHashProvider");

var _AppError = _interopRequireDefault(require("@shared/errors/AppError"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreatePacientService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("PacientsRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("HashProvider")(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IPacientsRepository.IPacientsRepository === "undefined" ? Object : _IPacientsRepository.IPacientsRepository, typeof _IHashProvider.IHashProvider === "undefined" ? Object : _IHashProvider.IHashProvider]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class CreatePacientService {
  constructor(pacientsRepository, hashProvider) {
    this.pacientsRepository = pacientsRepository;
    this.hashProvider = hashProvider;
  }

  async execute({
    credential,
    identity,
    contact,
    address
  }) {
    const userExists = await this.pacientsRepository.findByEmail(credential.email);

    if (userExists) {
      throw new _AppError.default("User already exists");
    }

    credential.password = await this.hashProvider.generateHash(credential.password || "");
    return await this.pacientsRepository.create({
      credential,
      identity,
      contact,
      address
    });
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.default = CreatePacientService;