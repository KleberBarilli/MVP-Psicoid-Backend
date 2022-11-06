import request from 'supertest'
import { app } from '@shared/infra/http/app'
import { psico } from '@shared/mocks'

describe('Psychologist Module E2E', () => {
	let psicoId: string
	test('[e2e]Should be able to create a new psychologist', async () => {
		const response = await request(app).post('/psico').send({
			psico,
		})
		psicoId = response.body.data.user.id
		expect(response.status).toBe(201)
		expect(response.body.error).toBeFalsy()
		expect(response.body).toHaveProperty('data.user.id')
	})

	test('[e2e] Should not be able to create a existing psychologist', async () => {
		const response = await request(app).post('/psico').send({
			psico,
		})
		expect(response.body.error).toBeTruthy()
	})
	test('[e2e] Should be able to find a existing psychologist', async () => {
		const response = await request(app).get(`/psico/${psicoId}`)
		expect(response.status).toBe(200)
		expect(response.body.data).toBeTruthy()
		expect(response.body.error).toBeFalsy()
	})
	test('[e2e] Should not be able to find a inexisting psychologist', async () => {
		const response = await request(app).get(`/psico/invalidId}`)
		expect(response.status).toBe(400)
		expect(response.body.error).toBeTruthy()
	})
	// it('[e2e] Should be able to find a existing customer', async () => {
	// 	const login = await request(app).post('/session').send({
	// 		email: customer.credentials.email,
	// 		password: customer.credentials.password,
	// 	})

	// 	//console.log('ccc user,', login.body)
	// 	customerId = login.body.data.user.customer.id
	// 	jwtToken = login.body.data.token

	// 	const response = await request(app)
	// 		.get(`/customer/${customerId}`)
	// 		.auth(jwtToken, { type: 'bearer' })
	// 	//.auth(auth.token, { type: 'bearer' })
	// 	console.log('req', response)
	// 	expect(response.status).toBe(200)
	// 	expect(response.body.data).toBeTruthy()
	// 	expect(response.body.error).toBeFalsy()
	// })
	// it('[e2e] Should not be able to find a inexisting customer', async () => {
	// 	const response = await request(app)
	// 		.get(`/customer/invalidId}`)
	// 		.auth(jwtToken, { type: 'bearer' })
	// 	expect(response.status).toBe(400)
	// 	expect(response.body.error).toBeTruthy()
	// })
})
