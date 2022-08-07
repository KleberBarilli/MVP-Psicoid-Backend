"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _client = require("@prisma/client");

function _classPrivateFieldLooseBase(receiver, privateKey) { if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) { throw new TypeError("attempted to use private field on non-instance"); } return receiver; }

var id = 0;

function _classPrivateFieldLooseKey(name) { return "__private_" + id++ + "_" + name; }

var _prisma = /*#__PURE__*/_classPrivateFieldLooseKey("prisma");

class UsersRepository {
  constructor() {
    Object.defineProperty(this, _prisma, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldLooseBase(this, _prisma)[_prisma] = new _client.PrismaClient();
  }

  async create({
    name,
    email,
    password
  }) {
    const user = await this.usersRepository.create({
      name,
      email,
      password
    });
    return user;
  }

  async findMe(email, param) {
    return await this.usersRepository.findOne({
      email
    }).select(param);
  }

  async findById(id) {
    return await this.usersRepository.findById(id);
  }

  async findOne(query) {
    return await this.usersRepository.findOne(query);
  }

  async findAll() {
    return await this.usersRepository.find();
  }

}

exports.default = UsersRepository;