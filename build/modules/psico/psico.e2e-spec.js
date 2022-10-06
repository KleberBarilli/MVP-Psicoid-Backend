"use strict";

var _supertest = _interopRequireDefault(require("supertest"));

var _app = require("@shared/infra/http/app");

var _mocks = require("@shared/mocks");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("Psychologist Module E2E", () => {
  let psicoId;
  test("[e2e]Should be able to create a new psychologist", async () => {
    const response = await (0, _supertest.default)(_app.app).post("/psico").send({
      psico: _mocks.psico
    });
    console.log(response.error);
    psicoId = response.body.data.id;
    expect(response.status).toBe(201);
    expect(response.body.error).toBeFalsy();
    expect(response.body).toHaveProperty("data.id");
  });
  test("[e2e] Should not be able to create a existing psychologist", async () => {
    const response = await (0, _supertest.default)(_app.app).post("/psico").send({
      psico: _mocks.psico
    });
    expect(response.body.error).toBeTruthy();
  });
  test("[e2e] Should be able to find a existing psychologist", async () => {
    const response = await (0, _supertest.default)(_app.app).get(`/psico/${psicoId}`);
    expect(response.status).toBe(200);
    expect(response.body.data).toBeTruthy();
    expect(response.body.error).toBeFalsy();
  });
  test("[e2e] Should not be able to find a inexisting psychologist", async () => {
    const response = await (0, _supertest.default)(_app.app).get(`/psico/invalidId}`);
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
  });
});