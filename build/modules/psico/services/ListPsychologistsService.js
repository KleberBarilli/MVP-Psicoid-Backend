"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _IPsychologistsRepository = require("../domain/repositories/IPsychologistsRepository");

var _distance = require("@shared/utils/distance");

var _etc = require("@shared/utils/etc");

var _dec, _dec2, _dec3, _dec4, _class;

let ListPsychologistsService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("PsychologistsRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IPsychologistsRepository.IPsychologistsRepository === "undefined" ? Object : _IPsychologistsRepository.IPsychologistsRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ListPsychologistsService {
  constructor(psychologistsRepository) {
    this.psychologistsRepository = psychologistsRepository;
  }

  async execute(pagination) {
    const {
      latitude,
      longitude
    } = pagination.location;
    const [count, psychologists] = await this.psychologistsRepository.findAll(pagination);
    let ratings = [];
    psychologists.map(psico => {
      psico.distance = (0, _distance.getKmDistance)({
        latitude,
        longitude
      }, {
        latitude: psico.address.latitude,
        longitude: psico.address.longitude
      });
      psico.reviews.map(review => {
        ratings.push(review.rating);
      });
      psico.avgRating = Math.round((0, _etc.arrAvg)(ratings));
      return psico;
    });
    return [count, psychologists];
  }

}) || _class) || _class) || _class) || _class);
exports.default = ListPsychologistsService;