import request from "supertest";
import { app } from "@shared/infra/http/app";
import { pacient } from "@shared/mocks";

beforeEach(() => console.log("connection setup"));

describe("Pacient Module E2E", async () => {
	let pacientId: string;
	test("[e2e]Should be able to create a new pacient", async () => {
		const response = await request(app).post("/pacient").send({
			pacient,
		});
		pacientId = response.body.pacient.id;
		expect(response.status).toBe(201);
		expect(response.body.error).toBeFalsy();
		expect(response.body).toHaveProperty("data.id");
	});

	test("[e2e] Should not be able to create a existing pacient", async () => {
		const response = await request(app).post("/pacient").send({
			pacient,
		});
		expect(response.status).toBe(400);
		expect(response.body.error).toBeTruthy();
	});
	test("[e2e] Should be able to find a existing pacient", async () => {
		const response = await request(app).get(`/pacient/${pacientId}`).send({
			pacient,
		});
		expect(response.status).toBe(200);
		expect(response.body.data).toBeTruthy();
		expect(response.body.error).toBeFalsy();
	});
	test("[e2e] Should not be able to find a inexisting pacient", async () => {
		const response = await request(app).get(`/pacient/invalidId}`).send({
			pacient,
		});
		expect(response.status).toBe(400);
		expect(response.body.error).toBeTruthy();
	});
});
