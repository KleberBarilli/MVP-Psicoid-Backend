import 'reflect-metadata';
import CreateUserService from '../CreateUserService';
import FakeUsersRepository from '../../domain/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../../providers/HashProvider/fakes/FakeHashProvider';
import AppError from '../../../../shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let createUserService: CreateUserService;
let fakeHashProvider: FakeHashProvider;

describe('CreateUser', () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository();
		fakeHashProvider = new FakeHashProvider();
		createUserService = new CreateUserService(
			fakeUsersRepository,
			fakeHashProvider,
		);
	});
	it('Should be able to create a new user', async () => {
		const user = await createUserService.execute({
			name: 'kleber teste',
			email: 'kleber@teste.com',
			password: 'teste123',
		});

		expect(user).toHaveProperty('_id');
	});

	it('Should not be able to create an user with existing email', async () => {
		await createUserService.execute({
			name: 'anakin',
			email: 'darthvader@email.com',
			password: '123456789',
		});
		expect(
			createUserService.execute({
				name: 'Darth vader',
				email: 'darthvader@email.com',
				password: '123456',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
