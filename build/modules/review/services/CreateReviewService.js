"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _IReviewsRepository = require("../domain/repositories/IReviewsRepository");

var _dec, _dec2, _dec3, _dec4, _class;

let CreateReviewService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("ReviewsRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IReviewsRepository.IReviewsRepository === "undefined" ? Object : _IReviewsRepository.IReviewsRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class CreateReviewService {
  constructor(reviewsRepository) {
    this.reviewsRepository = reviewsRepository;
  }

  execute({
    pacientId,
    psychologistId,
    rating,
    comment
  }) {
    return this.reviewsRepository.create({
      pacientId,
      psychologistId,
      rating,
      comment
    });
  }

}) || _class) || _class) || _class) || _class);
exports.default = CreateReviewService;