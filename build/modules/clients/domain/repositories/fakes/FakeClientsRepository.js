"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ClientEntityFake = void 0;

var _uuid = require("uuid");

class ClientEntityFake {
  constructor() {
    this.id = void 0;
    this.credentialId = void 0;
    this.individualIdentityId = void 0;
    this.createdAt = void 0;
    this.updatedAt = void 0;
  }

} //https://www.prisma.io/docs/guides/testing/unit-testing


exports.ClientEntityFake = ClientEntityFake;

class FakeClientsRepository {
  constructor() {
    this.clients = [];
  }

  async create({
    credentialId,
    individualIdentityId,
    createdAt,
    updatedAt
  }) {
    const client = new ClientEntityFake();
    client.id = (0, _uuid.v4)();
    client.credentialId = credentialId;
    client.individualIdentityId = individualIdentityId;
    client.createdAt = new Date();
    client.updatedAt = new Date();
    this.clients.push(client);
    return client;
  }

  async findByEmail(email) {
    return null;
  }

  async findById(id) {
    return null;
  }

}

var _default = FakeClientsRepository;
exports.default = _default;