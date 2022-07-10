"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = connectToDatabase;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _AppError = _interopRequireDefault(require("../../errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function connectToDatabase() {
  _mongoose.default.connect('mongodb+srv://DI-Tech:fPRzgywD7byLn9bQ@digital-inspires-sa-eas.rhv3i.mongodb.net/psicoID_local');
}

const db = _mongoose.default.connection;
db.once('open', () => console.log('Connected to database'));
db.on('error', () => {
  throw new _AppError.default('Error connecting to database');
});