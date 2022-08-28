import request from "supertest";
import { app } from "./shared/infra/http/app";
import { pacient } from "@shared/mocks";

test("[e2e] Create Pacient", async () => {
	const response = await request(app).post("/pacient").send({
		pacient,
	});
	console.log(response.error);
	expect(response.status).toBe(200);
	expect(response.body.error).toBeFalsy();
});

test("[e2e] Create Pacient", async () => {
	const response = await request(app).post("/pacient").send({
		pacient,
	});
	console.log(response.error);
	expect(response.status).toBe(200);
	expect(response.body.error).toBeFalsy();
});
