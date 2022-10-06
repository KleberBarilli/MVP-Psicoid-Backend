"use strict";

var _supertest = _interopRequireDefault(require("supertest"));

var _app = require("@shared/infra/http/app");

var _mocks = require("@shared/mocks");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//beforeEach(() => console.log("connection setup"));
describe("Pacient Module E2E", () => {
  let pacientId;
  test("[e2e]Should be able to create a new pacient", async () => {
    const response = await (0, _supertest.default)(_app.app).post("/pacient").send({
      pacient: _mocks.pacient
    });
    pacientId = response.body.data.id;
    expect(response.status).toBe(201);
    expect(response.body.error).toBeFalsy();
    expect(response.body).toHaveProperty("data.id");
  });
  test("[e2e] Should not be able to create a existing pacient", async () => {
    const response = await (0, _supertest.default)(_app.app).post("/pacient").send({
      pacient: _mocks.pacient
    });
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
  });
  test("[e2e] Should be able to find a existing pacient", async () => {
    const response = await (0, _supertest.default)(_app.app).get(`/pacient/${pacientId}`);
    expect(response.status).toBe(200);
    expect(response.body.data).toBeTruthy();
    expect(response.body.error).toBeFalsy();
  });
  test("[e2e] Should not be able to find a inexisting pacient", async () => {
    const response = await (0, _supertest.default)(_app.app).get(`/pacient/invalidId}`);
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
  });
});