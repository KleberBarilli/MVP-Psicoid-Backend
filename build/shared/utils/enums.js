"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ROLE_TYPE = exports.GENDER = exports.BRAZIL_STATES = void 0;
let BRAZIL_STATES;
exports.BRAZIL_STATES = BRAZIL_STATES;

(function (BRAZIL_STATES) {
  BRAZIL_STATES["acre"] = "AC";
  BRAZIL_STATES["alagoas"] = "AL";
  BRAZIL_STATES["amapa"] = "AP";
  BRAZIL_STATES["amazonas"] = "AM";
  BRAZIL_STATES["bahia"] = "BA";
  BRAZIL_STATES["ceara"] = "CE";
  BRAZIL_STATES["distrito_federal"] = "DF";
  BRAZIL_STATES["espirito_santo"] = "ES";
  BRAZIL_STATES["goiania"] = "GO";
  BRAZIL_STATES["maranhao"] = "MA";
  BRAZIL_STATES["mato_grosso"] = "MT";
  BRAZIL_STATES["mato_grosso_sul"] = "MS";
  BRAZIL_STATES["minas_gerais"] = "MG";
  BRAZIL_STATES["para"] = "PA";
  BRAZIL_STATES["paraiba"] = "PB";
  BRAZIL_STATES["parana"] = "PR";
  BRAZIL_STATES["pernanbuco"] = "PE";
  BRAZIL_STATES["piaui"] = "PI";
  BRAZIL_STATES["rio_de_janeiro"] = "RJ";
  BRAZIL_STATES["rio_grande_do_norte"] = "RN";
  BRAZIL_STATES["rio_grande_do_sul"] = "RS";
  BRAZIL_STATES["rondonia"] = "RO";
  BRAZIL_STATES["roraima"] = "RR";
  BRAZIL_STATES["santa_catarina"] = "SC";
  BRAZIL_STATES["sao_paulo"] = "SP";
  BRAZIL_STATES["sergipe"] = "SE";
  BRAZIL_STATES["tocantins"] = "TO";
})(BRAZIL_STATES || (exports.BRAZIL_STATES = BRAZIL_STATES = {}));

let ROLE_TYPE;
exports.ROLE_TYPE = ROLE_TYPE;

(function (ROLE_TYPE) {
  ROLE_TYPE["pacient"] = "PACIENT";
  ROLE_TYPE["psychologist"] = "PSYCHOLOGIST";
})(ROLE_TYPE || (exports.ROLE_TYPE = ROLE_TYPE = {}));

let GENDER;
exports.GENDER = GENDER;

(function (GENDER) {
  GENDER["male"] = "MALE";
  GENDER["female"] = "FEMALE";
  GENDER["other"] = "OTHER";
})(GENDER || (exports.GENDER = GENDER = {}));