import request from 'supertest'
import { app } from '@shared/infra/http/app'
import { psico } from '@shared/mocks'

describe('Psychologist Module E2E', () => {
	let psicoId: string
	test('[e2e]Should be able to create a new psychologist', async () => {
		const response = await request(app).post('/psico').send({
			psico,
		})
		console.log(response.error)
		psicoId = response.body.data.id
		expect(response.status).toBe(201)
		expect(response.body.error).toBeFalsy()
		expect(response.body).toHaveProperty('data.id')
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
})
