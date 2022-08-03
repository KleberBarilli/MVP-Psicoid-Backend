import 'reflect-metadata';
import CreateClientService from '../CreateClientService';
import FakeClientsRepository from '../../domain/repositories/fakes/FakeClientsRepository';
import FakeHashProvider from '../../providers/HashProvider/fakes/FakeHashProvider';
import AppError from '../../../../shared/errors/AppError';

let fakeClientsRepository: FakeClientsRepository;
let createClientService: CreateClientService;
let fakeHashProvider: FakeHashProvider;

describe('CreateClient', () => {
	beforeEach(() => {
		fakeClientsRepository = new FakeClientsRepository();
		fakeHashProvider = new FakeHashProvider();
		createClientService = new CreateClientService(
			fakeClientsRepository,
			fakeHashProvider,
		);
	});
	it('Should be able to create a new user', async () => {
		const client = await createClientService.execute({
			credential: {
				id: 'sdsd',
				email: 'kb@gmail.com',
				password: '@1554654564',
				roles: ['CLIENT'],
				provider: 'EMAIL',
				inactive: false,
				tokenRecovery: null,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			identity: {
				cpf: '0000000000000',
				firstName: 'John',
				lastName: 'Doe',
			},
			address: {
				city: 'muliternop',
				state: 'RJ',
				neighborhood: 'bairro',
				number: '540',
				street: 'cemter',
				zipCode: '99990=0000',
			},
			contact: { cellPhone: '54-8456+465+465+' },
		});

		expect(client).toHaveProperty('id');
	});

	it('Should not be able to create an user with existing email', async () => {
		await createClientService.execute({
			credential: {
				id: 'sdsd',
				email: 'kb@gmail.com',
				password: '@1554654564',
				roles: ['CLIENT'],
				provider: 'EMAIL',
				inactive: false,
				tokenRecovery: null,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			identity: {
				cpf: '0000000000000',
				firstName: 'John',
				lastName: 'Doe',
			},
			address: {
				city: 'muliternop',
				state: 'RJ',
				neighborhood: 'bairro',
				number: '540',
				street: 'cemter',
				zipCode: '99990=0000',
			},
			contact: { cellPhone: '54-8456+465+465+' },
		});
		expect(
			createClientService.execute({
				credential: {
					id: 'sdsd',
					email: 'kb@gmail.com',
					password: '@1554654564',
					roles: ['CLIENT'],
					provider: 'EMAIL',
					inactive: false,
					tokenRecovery: null,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				identity: {
					cpf: '0000000000000',
					firstName: 'John',
					lastName: 'Doe',
				},
				address: {
					city: 'muliternop',
					state: 'RJ',
					neighborhood: 'bairro',
					number: '540',
					street: 'cemter',
					zipCode: '99990=0000',
				},
				contact: {},
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
