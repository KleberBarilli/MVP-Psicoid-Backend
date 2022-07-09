"use strict";

var _express = _interopRequireDefault(require("express"));

require("express-async-errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
app.listen(3333, () => {
  console.log(`Rodando na porta ${process.env.PORT}`);
});