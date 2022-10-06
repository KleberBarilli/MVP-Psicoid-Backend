"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendBadRequest = void 0;

const sendBadRequest = (req, res, message, status) => {
  return res.status(status || 400).json({
    error: message
  });
};

exports.sendBadRequest = sendBadRequest;