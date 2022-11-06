import request from 'supertest'
import { app } from '@shared/infra/http/app'
import { customer } from '@shared/mocks'

let jwtToken: string

describe('Customer Module E2E', () => {
	let customerId: string

	it('[e2e]Should be able to create a new customer', async () => {
		const response = await request(app).post('/customer').send({
			customer,
		})
		expect(response.status).toBe(201)
		expect(response.body.error).toBeFalsy()
		expect(response.body).toHaveProperty('data.user.id')
	})

	it('[e2e] Should not be able to create a existing customer', async () => {
		const response = await request(app).post('/customer').send({
			customer,
		})
		expect(response.status).toBe(400)
		expect(response.body.error).toBeTruthy()
	})
	it('[e2e] Should not be able to find a customer if you are a customer', async () => {
		const login = await request(app).post('/session').send({
			email: customer.credentials.email,
			password: customer.credentials.password,
		})
		customerId = login.body.data.user.customer.id
		jwtToken = login.body.data.token

		const response = await request(app)
			.get(`/customer/${customerId}`)
			.auth(jwtToken, { type: 'bearer' })
		expect(response.status).toBe(403)
	})
})
