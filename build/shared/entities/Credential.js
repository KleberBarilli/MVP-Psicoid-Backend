"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CredentialEntity = void 0;

class CredentialEntity {
  constructor() {
    this.id = void 0;
    this.provider = void 0;
    this.email = void 0;
    this.password = void 0;
    this.tokenRecovery = void 0;
    this.role = void 0;
    this.inactive = void 0;
    this.createdAt = void 0;
    this.updatedAt = void 0;
  }

}

exports.CredentialEntity = CredentialEntity;