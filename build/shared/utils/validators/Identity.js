"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateUpdateIdentity = exports.validateIdentity = void 0;

var yup = _interopRequireWildcard(require("yup"));

var _cpfCnpjValidator = require("cpf-cnpj-validator");

var _enums = require("../enums");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const validateIdentity = identity => yup.object().shape({
  firstName: yup.string().required("O nome é obrigatório"),
  lastName: yup.string().required("O sobrenome é obrigatório"),
  cpf: yup.string().test({
    test: v => !v || _cpfCnpjValidator.cpf.isValid(v),
    message: "CPF Inválido"
  }).required("O CPF é obrigatório"),
  gender: yup.string().oneOf(Object.values(_enums.GENDER))
}).validate(identity, {
  abortEarly: false,
  stripUnknown: true
});

exports.validateIdentity = validateIdentity;

const validateUpdateIdentity = identity => yup.object().shape({
  firstName: yup.string(),
  lastName: yup.string(),
  cpf: yup.string().test({
    test: v => !v || _cpfCnpjValidator.cpf.isValid(v),
    message: "CPF Inválido"
  })
}).validate(identity, {
  abortEarly: false,
  stripUnknown: true
});

exports.validateUpdateIdentity = validateUpdateIdentity;