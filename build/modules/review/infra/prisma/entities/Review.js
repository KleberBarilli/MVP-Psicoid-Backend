"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReviewEntity = void 0;

class ReviewEntity {
  constructor() {
    this.id = void 0;
    this.pacientId = void 0;
    this.psychologistId = void 0;
    this.rating = void 0;
    this.comment = void 0;
    this.createdAt = void 0;
    this.updatedAt = void 0;
  }

}

exports.ReviewEntity = ReviewEntity;