"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _IPacientsRepository = require("../domain/repositories/IPacientsRepository");

var _PsychologistsRepository = _interopRequireDefault(require("@modules/psico/infra/prisma/repositories/PsychologistsRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let AddPsychologistService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("PacientsRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("PsychologistsRepository")(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IPacientsRepository.IPacientsRepository === "undefined" ? Object : _IPacientsRepository.IPacientsRepository, typeof _PsychologistsRepository.default === "undefined" ? Object : _PsychologistsRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class AddPsychologistService {
  constructor(pacientsRepository, psychologistsRepository) {
    this.pacientsRepository = pacientsRepository;
    this.psychologistsRepository = psychologistsRepository;
  }

  async execute({
    pacientId,
    psychologistId,
    selected
  }) {
    let selectedPsychologistId = psychologistId;

    if (!selected) {
      const pacient = await this.pacientsRepository.findById(pacientId);
      selectedPsychologistId = pacient?.selectedPsychologistId || "";
    }

    return this.pacientsRepository.addPsychologist(pacientId, psychologistId, selectedPsychologistId);
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.default = AddPsychologistService;