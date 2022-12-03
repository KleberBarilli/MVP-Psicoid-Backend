import request from "supertest";
import { app } from "@shared/infra/http/app";
import { customer, guestCustomer } from "@shared/mocks";
import { psico2 } from "@shared/mocks";

describe("Customer Module E2E", () => {
	let customerId: string;
	let jwtCustomer: string;
	let jwtPsico: string;

	it("[e2e]Should be able to create a new customer", async () => {
		const response = await request(app).post("/customer").send({
			customer,
		});
		expect(response.status).toBe(201);
		expect(response.body.error).toBeFalsy();
		expect(response.body).toHaveProperty("data.user.id");
		expect(response.body).toHaveProperty("data.session.token");
	});

	it("[e2e] Should not be able to create a existing customer", async () => {
		const response = await request(app).post("/customer").send({
			customer,
		});
		expect(response.status).toBe(400);
		expect(response.body.error).toBeTruthy();
	});
	it("[e2e] Should not be able to find a customer if you are a customer", async () => {
		const login = await request(app).post("/session").send({
			email: customer.credentials.email,
			password: customer.credentials.password,
		});
		customerId = login.body.data.user.customer.id;
		jwtCustomer = login.body.data.token;

		const response = await request(app)
			.get(`/customer/${customerId}`)
			.auth(jwtCustomer, { type: "bearer" });
		expect(response.status).toBe(403);
	});
	it("[e2e] Should be able to find a customer", async () => {
		const createPsico = await request(app).post("/psico").send({
			psico: psico2,
		});
		jwtPsico = createPsico.body.data.session.token;

		const response = await request(app)
			.get(`/customer/${customerId}`)
			.auth(jwtPsico, { type: "bearer" });
		expect(response.status).toBe(200);
		expect(response.body.data.id).toEqual(customerId);
		expect(response.body.error).toBeFalsy();
		expect(response.body).toHaveProperty("data");
		expect(response.body).toHaveProperty("data.id");
		expect(response.body).toHaveProperty("data.profile");
	});
	it("[e2e] Should not be able to find a inexistent customer", async () => {
		const response = await request(app)
			.get(`/customer/invalidId`)
			.auth(jwtPsico, { type: "bearer" });
		expect(response.status).toBe(400);
		expect(response.body.error).toBeTruthy();
		expect(response.body).toHaveProperty("error");
	});
	it("[e2e]Should be able to create a new guest-customer", async () => {
		const response = await request(app)
			.post("/customer/guest")
			.send({
				guest: guestCustomer,
			})
			.auth(jwtPsico, { type: "bearer" });
		expect(response.status).toBe(201);
		expect(response.body.error).toBeFalsy();
		expect(response.body).toHaveProperty("data.guestId");
	});
	it("[e2e]Should be able to update a customer", async () => {
		const response = await request(app)
			.put("/customer")
			.send({
				customer: {
					profile: {
						firstName: "Edit Name",
					},
				},
			})
			.auth(jwtCustomer, { type: "bearer" });
		expect(response.status).toBe(204);
		expect(response.body.error).toBeFalsy();
	});
});
