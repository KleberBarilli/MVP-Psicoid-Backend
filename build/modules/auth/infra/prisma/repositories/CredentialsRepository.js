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

class CredentialsRepository {
  constructor() {
    Object.defineProperty(this, _prisma, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldLooseBase(this, _prisma)[_prisma] = new _client.PrismaClient();
  }

  async findById(id) {
    return await _classPrivateFieldLooseBase(this, _prisma)[_prisma].credential.findUnique({
      where: {
        id
      }
    });
  }

  async findByEmail(email) {
    return await _classPrivateFieldLooseBase(this, _prisma)[_prisma].credential.findUnique({
      where: {
        email
      },
      include: {
        pacient: {
          select: {
            id: true
          }
        },
        psychologist: {
          select: {
            id: true
          }
        }
      }
    });
  }

  async findByToken(token) {
    return await _classPrivateFieldLooseBase(this, _prisma)[_prisma].credential.findFirst({
      where: {
        tokenRecovery: token
      }
    });
  }

  updatePassword(id, password) {
    return _classPrivateFieldLooseBase(this, _prisma)[_prisma].credential.update({
      where: {
        id
      },
      data: {
        password
      }
    });
  }

  updateToken(id, tokenRecovery) {
    return _classPrivateFieldLooseBase(this, _prisma)[_prisma].credential.update({
      where: {
        id
      },
      data: {
        tokenRecovery
      }
    });
  }

  async iAmPsico(id) {
    return await _classPrivateFieldLooseBase(this, _prisma)[_prisma].credential.findUnique({
      where: {
        id
      },
      include: {
        psychologist: {
          include: {
            identity: {
              include: {
                address: true,
                contact: true
              }
            },
            office: {
              include: {
                address: true,
                contact: true
              }
            },
            approaches: true,
            pacients: true
          }
        }
      }
    });
  }

  async iAmPacient(id) {
    return await _classPrivateFieldLooseBase(this, _prisma)[_prisma].credential.findUnique({
      where: {
        id
      },
      include: {
        pacient: {
          include: {
            identity: {
              include: {
                address: true,
                contact: true
              }
            },
            psychologists: {
              select: {
                id: true,
                approaches: true,
                identity: {
                  include: {
                    address: true,
                    contact: true
                  }
                },
                resume: true
              }
            }
          }
        }
      }
    });
  }

  deactivateAccount(id) {
    return _classPrivateFieldLooseBase(this, _prisma)[_prisma].credential.update({
      where: {
        id
      },
      data: {
        inactive: true
      }
    });
  }

  updateCredential(id, {
    email,
    password
  }) {
    return _classPrivateFieldLooseBase(this, _prisma)[_prisma].credential.update({
      where: {
        id
      },
      data: {
        email,
        password
      }
    });
  }

}

exports.default = CredentialsRepository;