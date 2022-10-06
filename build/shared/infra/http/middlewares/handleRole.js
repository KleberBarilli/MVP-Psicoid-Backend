"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleRole = void 0;

const handleRole = (...roles) => ({
  user
}, res, next) => {
  if (roles.includes(user.profile.toUpperCase())) {
    next();
  } else {
    return res.status(403).send({
      message: `Permissão negada para usuário tipo '${user.profile}'`
    });
  }
};

exports.handleRole = handleRole;