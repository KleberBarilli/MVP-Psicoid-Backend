"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsersModel = exports.UserSchema = void 0;

var _mongoose = require("mongoose");

const UserSchema = new _mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    select: false
  },
  avatar: {
    type: String
  }
}, {
  timestamps: true
});
exports.UserSchema = UserSchema;

UserSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

const UsersModel = (0, _mongoose.model)('User', UserSchema);
exports.UsersModel = UsersModel;