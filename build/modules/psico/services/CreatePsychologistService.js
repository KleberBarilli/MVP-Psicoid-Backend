"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("@shared/errors/AppError"));

var _IPsychologistsRepository = require("../domain/repositories/IPsychologistsRepository");

var _IHashProvider = require("@modules/auth/providers/HashProvider/models/IHashProvider");

var _geocoder = require("@shared/utils/geocoder");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreatePsychologistService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("PsychologistsRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("HashProvider")(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IPsychologistsRepository.IPsychologistsRepository === "undefined" ? Object : _IPsychologistsRepository.IPsychologistsRepository, typeof _IHashProvider.IHashProvider === "undefined" ? Object : _IHashProvider.IHashProvider]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class CreatePsychologistService {
  constructor(psychologistsRepository, hashProvider) {
    this.psychologistsRepository = psychologistsRepository;
    this.hashProvider = hashProvider;
  }

  async execute({
    credential,
    identity,
    contact,
    address,
    office,
    resume
  }) {
    const userExists = await this.psychologistsRepository.findByEmail(credential.email);

    if (userExists) {
      throw new _AppError.default("User already exists");
    }

    credential.password = await this.hashProvider.generateHash(credential.password || "");
    const location = await (0, _geocoder.getGeocode)(`${address.number} ${address.street} ${address.neighborhood} ${address.city}`);
    address.latitude = location[0].latitude;
    address.longitude = location[0].longitude;
    return this.psychologistsRepository.create({
      credential,
      identity,
      contact,
      address,
      office,
      resume
    });
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.default = CreatePsychologistService;