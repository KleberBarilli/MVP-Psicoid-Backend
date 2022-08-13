"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _tsyringe = require("tsyringe");

var _IClientsRepository = require("../domain/repositories/IClientsRepository");

var _IHashProvider = require("../../auth/providers/HashProvider/models/IHashProvider");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateClientService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('ClientsRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('HashProvider')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IClientsRepository.IClientsRepository === "undefined" ? Object : _IClientsRepository.IClientsRepository, typeof _IHashProvider.IHashProvider === "undefined" ? Object : _IHashProvider.IHashProvider]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class CreateClientService {
  constructor(clientsRepository, hashProvider) {
    this.clientsRepository = clientsRepository;
    this.hashProvider = hashProvider;
  }

  async execute({
    credential,
    identity,
    contact,
    address
  }) {
    //console.log(address);
    const userExists = await this.clientsRepository.findByEmail(credential.email);

    if (userExists) {
      throw new _AppError.default('User already exists');
    }

    credential.password = await this.hashProvider.generateHash(credential.password || '');
    return await this.clientsRepository.create({
      credential,
      identity,
      contact,
      address
    });
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.default = CreateClientService;