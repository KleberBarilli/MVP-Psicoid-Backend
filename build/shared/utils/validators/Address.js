"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateUpdateAddress = exports.validateAddress = void 0;

var yup = _interopRequireWildcard(require("yup"));

var _enums = require("../enums");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const validateAddress = address => yup.object().shape({
  zipCode: yup.string().typeError("CEP inválido").min(8, "CEP muito curto, digite ao menos 8 caracteres").required("Necessário preencher o campo CEP"),
  street: yup.string().required("Necessário preencher o nome da rua"),
  number: yup.string(),
  complement: yup.string(),
  neighborhood: yup.string(),
  city: yup.string().required("Necessário preencher a cidade"),
  state: yup.string().typeError("Estado inválido").oneOf(Object.values(_enums.BRAZIL_STATES)).required("Necessário preencher o estado")
}).validate(address, {
  abortEarly: false,
  stripUnknown: true
});

exports.validateAddress = validateAddress;

const validateUpdateAddress = address => yup.object().shape({
  zipCode: yup.string().typeError("CEP inválido").min(8, "CEP muito curto, digite ao menos 8 caracteres"),
  street: yup.string(),
  number: yup.string(),
  complement: yup.string(),
  neighborhood: yup.string(),
  city: yup.string(),
  state: yup.string().typeError("Estado inválido").oneOf(Object.values(_enums.BRAZIL_STATES))
}).validate(address, {
  abortEarly: false,
  stripUnknown: true
});

exports.validateUpdateAddress = validateUpdateAddress;