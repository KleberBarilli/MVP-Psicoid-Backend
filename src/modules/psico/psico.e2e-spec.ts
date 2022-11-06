import request from 'supertest'
import { app } from '@shared/infra/http/app'
import { psico } from '@shared/mocks'

describe('Psychologist Module E2E', () => {
	let psicoId: string
	let jwtPsico: string
	it('[e2e]Should be able to create a new psychologist', async () => {
		const response = await request(app).post('/psico').send({
			psico,
		})
		psicoId = response.body.data.user.id
		expect(response.status).toBe(201)
		expect(response.body.error).toBeFalsy()
		expect(response.body).toHaveProperty('data.user.id')
		expect(response.body).toHaveProperty('data.session.token')
	})

	it('[e2e] Should not be able to create a existing psychologist', async () => {
		const response = await request(app).post('/psico').send({
			psico,
		})
		expect(response.body.error).toBeTruthy()
	})
	it('[e2e] Should be able to find a existing psychologist', async () => {
		const login = await request(app).post('/session').send({
			email: psico.credentials.email,
			password: psico.credentials.password,
		})
		jwtPsico = login.body.data.token
		const response = await request(app)
			.get(`/psico/${psicoId}`)
			.auth(jwtPsico, { type: 'bearer' })
		expect(response.status).toBe(200)
		expect(response.body.data).toBeTruthy()
		expect(response.body.error).toBeFalsy()
		expect(response.body.data).toHaveProperty('profile')
	})
	it('[e2e] Should not be able to find a inexisting psychologist', async () => {
		const response = await request(app)
			.get(`/psico/invalidId`)
			.auth(jwtPsico, { type: 'bearer' })
		expect(response.status).toBe(400)
		expect(response.body.error).toBeTruthy()
		expect(response.body).toHaveProperty('error')
	})
	it('[e2e]Should be able to update a psychologist', async () => {
		const response = await request(app)
			.put('/psico')
			.send({
				psico: {
					profile: {
						firstName: 'Edit Name',
					},
				},
			})
			.auth(jwtPsico, { type: 'bearer' })
		expect(response.status).toBe(204)
		expect(response.body.error).toBeFalsy()
	})
})
