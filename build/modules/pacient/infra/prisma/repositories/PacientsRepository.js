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

  async create({
    credential,
    identity,
    contact,
    address
  }) {
    const {
      email,
      password,
      role
    } = credential;
    return _classPrivateFieldLooseBase(this, _prisma)[_prisma].pacient.create({
      data: {
        credential: {
          create: {
            email,
            password,
            role
          }
        },
        identity: {
          create: { ...identity,
            contact: {
              create: { ...contact
              }
            },
            address: {
              create: { ...address
              }
            }
          }
        }
      }
    });
  }

  async findById(id) {
    return await _classPrivateFieldLooseBase(this, _prisma)[_prisma].pacient.findUnique({
      where: {
        id
      },
      include: {
        credential: {
          select: {
            email: true
          }
        },
        identity: {
          include: {
            address: true,
            contact: true
          }
        },
        psychologists: true
      }
    });
  }

  async findByEmail(email) {
    return await _classPrivateFieldLooseBase(this, _prisma)[_prisma].credential.findUnique({
      where: {
        email
      }
    });
  }

  update(id, {
    identity,
    contact,
    address,
    selectedPsychologistId
  }) {
    return _classPrivateFieldLooseBase(this, _prisma)[_prisma].pacient.update({
      where: {
        id
      },
      data: {
        selectedPsychologistId,
        identity: {
          update: { ...identity,
            contact: {
              update: { ...contact
              }
            },
            address: {
              update: { ...address
              }
            }
          }
        }
      }
    });
  }

  addPsychologist(pacientId, psicoId, selectedPsychologistId) {
    return _classPrivateFieldLooseBase(this, _prisma)[_prisma].pacient.update({
      where: {
        id: pacientId
      },
      data: {
        psychologists: {
          connect: {
            id: psicoId
          }
        },
        selectedPsychologistId
      }
    });
  }

  addReview(data) {
    return _classPrivateFieldLooseBase(this, _prisma)[_prisma].review.create({
      data
    });
  }

  updateReview({
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

  removeReview(id) {
    return _classPrivateFieldLooseBase(this, _prisma)[_prisma].review.delete({
      where: {
        id
      }
    });
  }

}

exports.default = PacientsRepository;