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

class PsychologistsRepository {
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
    address,
    office,
    resume
  }) {
    return _classPrivateFieldLooseBase(this, _prisma)[_prisma].psychologist.create({
      data: {
        resume,
        status: "UNDER_REVIEW",
        credential: {
          create: { ...credential
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
        },
        office: {
          create: { ...office,
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
    return await _classPrivateFieldLooseBase(this, _prisma)[_prisma].psychologist.findUnique({
      where: {
        id
      },
      include: {
        office: {
          include: {
            address: true,
            contact: true
          }
        },
        identity: {
          include: {
            address: true,
            contact: true
          }
        },
        approaches: true
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
    office,
    resume
  }) {
    return _classPrivateFieldLooseBase(this, _prisma)[_prisma].psychologist.update({
      where: {
        id
      },
      data: {
        resume,
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
        },
        office: {
          update: { ...office,
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

  findAll({
    skip,
    take,
    sort,
    order,
    filter
  }) {
    return Promise.all([_classPrivateFieldLooseBase(this, _prisma)[_prisma].psychologist.count({
      where: { ...filter
      }
    }), _classPrivateFieldLooseBase(this, _prisma)[_prisma].psychologist.findMany({
      include: {
        identity: {
          include: {
            address: true,
            contact: true
          }
        },
        approaches: true,
        reviews: true
      },
      where: { ...filter
      },
      orderBy: {
        [sort]: order
      },
      skip,
      take
    })]);
  }

}

exports.default = PsychologistsRepository;