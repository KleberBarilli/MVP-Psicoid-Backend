"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PacientEntityFake = void 0;

var _uuid = require("uuid");

class PacientEntityFake {
  constructor() {
    this.id = void 0;
    this.credentialId = void 0;
    this.individualIdentityId = void 0;
    this.createdAt = void 0;
    this.updatedAt = void 0;
  }

} //https://www.prisma.io/docs/guides/testing/unit-testing


exports.PacientEntityFake = PacientEntityFake;

class FakePacientsRepository {
  constructor() {
    this.pacients = [];
  }

  async create({
    credentialId,
    individualIdentityId,
    createdAt,
    updatedAt
  }) {
    const pacient = new PacientEntityFake();
    pacient.id = (0, _uuid.v4)();
    pacient.credentialId = credentialId;
    pacient.individualIdentityId = individualIdentityId;
    pacient.createdAt = new Date();
    pacient.updatedAt = new Date();
    this.pacients.push(pacient);
    return pacient;
  }

  async findByEmail(email) {
    return null;
  }

  async findById(id) {
    return null;
  }

}

var _default = FakePacientsRepository;
exports.default = _default;