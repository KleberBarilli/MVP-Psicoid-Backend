"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateRandomNumber = exports.arrAvg = void 0;

const generateRandomNumber = digit => {
  return Math.random().toFixed(digit).split(".")[1];
};

exports.generateRandomNumber = generateRandomNumber;

const arrAvg = (arr = []) => arr.reduce((a, b) => a + b, 0) / arr.length;

exports.arrAvg = arrAvg;