import request from "supertest";
import { app } from "@shared/infra/http/app";
import { customer } from "@shared/mocks";

//beforeEach(() => console.log("connection setup"));

describe("Pacient Module E2E", () => {
	let customerId: string;
	test("[e2e]Should be able to create a new customer", async () => {
		const response = await request(app).post("/customer").send({
			customer,
		});
		customerId = response.body.data.id;
		expect(response.status).toBe(201);
		expect(response.body.error).toBeFalsy();
		expect(response.body).toHaveProperty("data.id");
	});

	test("[e2e] Should not be able to create a existing customer", async () => {
		const response = await request(app).post("/customer").send({
			customer,
		});
		expect(response.status).toBe(400);
		expect(response.body.error).toBeTruthy();
	});
	test("[e2e] Should be able to find a existing customer", async () => {
		const response = await request(app).get(`/customer/${customerId}`);
		expect(response.status).toBe(200);
		expect(response.body.data).toBeTruthy();
		expect(response.body.error).toBeFalsy();
	});
	test("[e2e] Should not be able to find a inexisting customer", async () => {
		const response = await request(app).get(`/customer/invalidId}`);
		expect(response.status).toBe(400);
		expect(response.body.error).toBeTruthy();
	});
});
