"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _User = require("../schemas/User");

class UsersRepository {
  constructor() {
    this.usersRepository = void 0;
    this.usersRepository = _User.UsersModel;
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

}

exports.default = UsersRepository;