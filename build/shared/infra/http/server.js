"use strict";

var _app = require("./app");

_app.app.listen(process.env.PORT, () => {
  console.log(`Rodando na porta ${process.env.PORT}`);
});