"use strict";

var _tsyringe = require("tsyringe");

var _BcryptHashProvider = _interopRequireDefault(require("./HashProvider/implementations/BcryptHashProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_tsyringe.container.registerSingleton('HashProvider', _BcryptHashProvider.default);