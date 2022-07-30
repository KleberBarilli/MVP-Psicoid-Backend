import AppError from '../../../shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import { ICreateClient } from '../domain/models/ICreateClient';
import { IClientCreated } from '../domain/models/IClientCreated';
import { IClientsRepository } from '../domain/repositories/IClientsRepository';
import { IHashProvider } from '../providers/HashProvider/models/IHashProvider';

@injectable()
export default class CreateClientService {
	constructor(
		@inject('ClientsRepository')
		private clientsRepository: IClientsRepository,
		@inject('HashProvider')
		private hashProvider: IHashProvider,
	) {}
	public async execute({
		credential,
		identity,
		contact,
		address,
	}: ICreateClient): Promise<IClientCreated> {
		//console.log(address);
		const userExists = await this.clientsRepository.findByEmail(
			credential.email,
		);
		if (userExists) {
			throw new AppError('User already exists');
		}
		credential.password = await this.hashProvider.generateHash(
			credential.password || '',
		);

		return await this.clientsRepository.create({
			credential,
			identity,
			contact,
			address,
		});
	}
}
