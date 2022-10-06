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

class PacientsRepository {
  constructor() {
    Object.defineProperty(this, _prisma, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldLooseBase(this, _prisma)[_prisma] = new _client.PrismaClient();
  }

  create(data) {
    return _classPrivateFieldLooseBase(this, _prisma)[_prisma].review.create({
      data
    });
  }

  findById(id) {
    return _classPrivateFieldLooseBase(this, _prisma)[_prisma].review.findUnique({
      where: {
        id
      }
    });
  }

  async findAllByPsico(id, {
    skip,
    take,
    sort,
    order,
    filter
  }) {
    return Promise.all([_classPrivateFieldLooseBase(this, _prisma)[_prisma].review.count({
      where: {
        psychologistId: id,
        ...filter
      }
    }), _classPrivateFieldLooseBase(this, _prisma)[_prisma].review.findMany({
      where: {
        psychologistId: id,
        ...filter
      },
      orderBy: {
        [sort]: order
      },
      skip,
      take
    })]);
  }

  update({
    id,
    comment,
    rating
  }) {
    return _classPrivateFieldLooseBase(this, _prisma)[_prisma].review.update({
      where: {
        id
      },
      data: {
        comment,
        rating
      }
    });
  }

  remove(id) {
    return _classPrivateFieldLooseBase(this, _prisma)[_prisma].review.delete({
      where: {
        id
      }
    });
  }

}

exports.default = PacientsRepository;