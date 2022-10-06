"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.psico = exports.pacient = void 0;
const pacient = {
  credentials: {
    email: "pacient@example.com",
    password: "pass12346",
    role: "PACIENT"
  },
  identity: {
    firstName: "John",
    lastName: "Douglas",
    cpf: "79521782021"
  },
  contact: {
    cellPhone: "54-99532383"
  },
  address: {
    zipCode: "99990-000",
    street: "main avenue",
    neighborhood: "center",
    number: "54",
    city: "Passo Fundo",
    state: "RS"
  }
};
exports.pacient = pacient;
const psico = {
  credentials: {
    email: "psico@example.com",
    password: "pass12346",
    role: "PSYCHOLOGIST"
  },
  identity: {
    firstName: "Anna",
    lastName: "Uzumaki",
    cpf: "98001451097"
  },
  contact: {
    cellPhone: "54-99532383"
  },
  address: {
    zipCode: "99990-000",
    street: "main avenue",
    neighborhood: "center",
    number: "54",
    city: "Passo Fundo",
    state: "RS"
  },
  resume: "Description.."
};
exports.psico = psico;